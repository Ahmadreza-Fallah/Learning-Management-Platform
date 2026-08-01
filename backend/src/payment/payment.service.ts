import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Payments, Enrollments } from '@prisma/client';

const PAYMENT_STATUS_SUCCESS = 1;

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async checkout(userId: number) {
    const cartItems = await this.prisma.carts.findMany({
      where: { User_Id: userId },
      include: { Courses: true },
    });

    if (cartItems.length === 0) {
      throw new BadRequestException('Your cart is empty');
    }

    const payments: Payments[] = [];
    const enrollments: Enrollments[] = [];

    for (const item of cartItems) {
      const course = item.Courses;
      const amount = course.DiscountPrice ?? course.Price;

      const payment = await this.prisma.payments.create({
        data: {
          User_Id: userId,
          Course_Id: course.Id,
          Amount: amount,
          RefNumber: `SIM-${Date.now()}-${course.Id}`,
          Status: PAYMENT_STATUS_SUCCESS,
        },
      });
      payments.push(payment);

      const existingEnrollment = await this.prisma.enrollments.findFirst({
        where: { Student_Id: userId, Course_Id: course.Id },
      });

      if (!existingEnrollment) {
        const enrollment = await this.prisma.enrollments.create({
          data: {
            Student_Id: userId,
            Course_Id: course.Id,
            Status: PAYMENT_STATUS_SUCCESS,
          },
        });
        enrollments.push(enrollment);
      }
    }

    const total = payments.reduce((sum, p) => sum + Number(p.Amount), 0);

    await this.prisma.carts.deleteMany({ where: { User_Id: userId } });

    return {
      message: 'Payment successful',
      total,
      payments,
      enrollments,
    };
  }
}
