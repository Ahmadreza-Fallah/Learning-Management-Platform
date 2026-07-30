// --- ADD to imports at the top of the file ---
import { BadRequestException } from '@nestjs/common'; // skip if already imported
import { CartService } from '../cart/cart.service';
import { randomUUID } from 'crypto';

// --- ADD to the constructor ---
constructor(
  private readonly prisma: PrismaService,
  private readonly cartService: CartService, // NEW
) {}

// --- ADD these constants near the top of the class (or a shared constants file) ---
// TODO: replace with your app's real status values once confirmed.
const PAYMENT_STATUS_SUCCESS = 1;
const ENROLLMENT_STATUS_ACTIVE = 1;

// --- ADD this method to the class ---
async checkout(userId: number) {
  const cartItems = await this.prisma.carts.findMany({
    where: { User_Id: userId },
    include: { Courses: true },
  });

  if (cartItems.length === 0) {
    throw new BadRequestException('Your cart is empty');
  }

  // One RefNumber ties all the per-course Payments rows from this
  // checkout together, since Payments has no order-level table.
  const refNumber = `CHK-${randomUUID()}`;

  const result = await this.prisma.$transaction(async (tx) => {
    const payments = [];
    const enrollments = [];

    for (const item of cartItems) {
      const amount = item.Courses.DiscountPrice ?? item.Courses.Price;

      const payment = await tx.payments.create({
        data: {
          User_Id: userId,
          Course_Id: item.Course_Id,
          Amount: amount,
          RefNumber: refNumber,
          Status: PAYMENT_STATUS_SUCCESS,
        },
      });
      payments.push(payment);

      const existingEnrollment = await tx.enrollments.findFirst({
        where: { Student_Id: userId, Course_Id: item.Course_Id },
      });

      if (!existingEnrollment) {
        const enrollment = await tx.enrollments.create({
          data: {
            Student_Id: userId,
            Course_Id: item.Course_Id,
            Status: ENROLLMENT_STATUS_ACTIVE,
          },
        });
        enrollments.push(enrollment);
      } else {
        enrollments.push(existingEnrollment);
      }
    }

    await tx.carts.deleteMany({ where: { User_Id: userId } });

    return { payments, enrollments };
  });

  const totalAmount = result.payments.reduce(
    (sum, p) => sum + Number(p.Amount),
    0,
  );

  return {
    success: true,
    refNumber,
    totalAmount,
    paymentIds: result.payments.map((p) => p.Id),
    status: PAYMENT_STATUS_SUCCESS,
    enrolledCourseIds: result.enrollments.map((e) => e.Course_Id),
    message: 'Payment successful. You are now enrolled in your course(s).',
  };
}