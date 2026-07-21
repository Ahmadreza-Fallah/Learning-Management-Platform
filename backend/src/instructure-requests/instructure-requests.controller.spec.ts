import { Test, TestingModule } from '@nestjs/testing';
import { InstructureRequestsController } from './instructure-requests.controller';

describe('InstructureRequestsController', () => {
  let controller: InstructureRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstructureRequestsController],
    }).compile();

    controller = module.get<InstructureRequestsController>(InstructureRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
