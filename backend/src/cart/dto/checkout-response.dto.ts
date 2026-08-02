export class CheckoutResponseDto {
  success: boolean;
  paymentId: number;
  amount: number;
  status: string;
  enrolledCourseIds: number[];
  message: string;
}
