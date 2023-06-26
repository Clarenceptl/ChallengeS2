import { Test, TestingModule } from '@nestjs/testing';
import { CompanySectorOptionsService } from './company-sector-options.service';

describe('CompanySectorOptionsService', () => {
  let service: CompanySectorOptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanySectorOptionsService]
    }).compile();

    service = module.get<CompanySectorOptionsService>(
      CompanySectorOptionsService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
