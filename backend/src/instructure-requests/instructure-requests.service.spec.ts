import { Test, TestingModule } from '@nestjs/testing';
import { InstructureRequestsService } from './instructure-requests.service';

describe('InstructureRequestsService', () => {
  let service: InstructureRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstructureRequestsService],
    }).compile();

    service = module.get<InstructureRequestsService>(InstructureRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
