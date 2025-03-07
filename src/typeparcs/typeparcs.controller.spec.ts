import { Test, TestingModule } from '@nestjs/testing';
import { TypeparcsController } from './typeparcs.controller';
import { TypeparcsService } from './typeparcs.service';

describe('TypeparcsController', () => {
  let controller: TypeparcsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeparcsController],
      providers: [TypeparcsService],
    }).compile();

    controller = module.get<TypeparcsController>(TypeparcsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
