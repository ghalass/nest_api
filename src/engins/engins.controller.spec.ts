import { Test, TestingModule } from '@nestjs/testing';
import { EnginsController } from './engins.controller';
import { EnginsService } from './engins.service';

describe('EnginsController', () => {
  let controller: EnginsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnginsController],
      providers: [EnginsService],
    }).compile();

    controller = module.get<EnginsController>(EnginsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
