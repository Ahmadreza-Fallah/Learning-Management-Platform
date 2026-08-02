// --- ADD to imports ---
import { CartModule } from '../cart/cart.module';

// --- ADD CartModule alongside whatever is already in the imports array ---
@Module({
  imports: [PrismaModule, CartModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
