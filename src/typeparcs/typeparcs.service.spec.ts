import { Test, TestingModule } from '@nestjs/testing';
import { TypeparcsService } from './typeparcs.service';

describe('TypeparcsService', () => {
  let service: TypeparcsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeparcsService],
    }).compile();

    service = module.get<TypeparcsService>(TypeparcsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
