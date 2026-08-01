import { Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { PaymentService } from './payment.service';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Payment')
@Controller('payment')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('checkout')
  @ApiOperation({ summary: 'Checkout current cart (simulated payment)' })
  @ApiResponse({
    status: 201,
    description: 'Payment successful, enrollments created',
  })
  @ApiResponse({ status: 400, description: 'Cart is empty' })
  async checkout(@CurrentUser() user: any) {
    return this.paymentService.checkout(user.id);
  }
}
