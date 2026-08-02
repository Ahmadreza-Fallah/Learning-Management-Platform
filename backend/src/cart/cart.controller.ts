import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CartService } from './cart.service';
import { CartResponseDto } from './dto/cart-item-response.dto';

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@CurrentUser() user: { id: number }): Promise<CartResponseDto> {
    return this.cartService.getCart(user.id);
  }

  @Post(':courseId')
  addToCart(
    @CurrentUser() user: { id: number },
    @Param('courseId', ParseIntPipe) courseId: number,
  ): Promise<CartResponseDto> {
    return this.cartService.addToCart(user.id, courseId);
  }

  @Delete(':courseId')
  removeFromCart(
    @CurrentUser() user: { id: number },
    @Param('courseId', ParseIntPipe) courseId: number,
  ): Promise<CartResponseDto> {
    return this.cartService.removeFromCart(user.id, courseId);
  }

  @Delete()
  clearCart(@CurrentUser() user: { id: number }): Promise<{ message: string }> {
    return this.cartService.clearCart(user.id);
  }
}
