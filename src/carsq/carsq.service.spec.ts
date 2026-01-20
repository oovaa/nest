import { Test, TestingModule } from '@nestjs/testing';
import { CarsqService } from './carsq.service';

describe('CarsqService', () => {
  let service: CarsqService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarsqService],
    }).compile();

    service = module.get<CarsqService>(CarsqService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
