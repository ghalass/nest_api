import { Test, TestingModule } from '@nestjs/testing';
import { EnginsService } from './engins.service';

describe('EnginsService', () => {
  let service: EnginsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnginsService],
    }).compile();

    service = module.get<EnginsService>(EnginsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
