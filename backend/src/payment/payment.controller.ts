// --- ADD to imports ---
import { Post } from '@nestjs/common';

// --- ADD this endpoint inside the existing PaymentController class ---
@Post('checkout')
checkout(@CurrentUser() user: { id: number }) {
  return this.paymentService.checkout(user.id); // adjust to user.Id if that's your JWT payload shape
}