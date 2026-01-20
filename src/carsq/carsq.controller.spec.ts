import { Test, TestingModule } from '@nestjs/testing';
import { CarsqController } from './carsq.controller';

describe('CarsqController', () => {
  let controller: CarsqController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarsqController],
    }).compile();

    controller = module.get<CarsqController>(CarsqController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
