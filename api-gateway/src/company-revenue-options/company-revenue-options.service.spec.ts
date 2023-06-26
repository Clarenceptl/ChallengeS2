import { Test, TestingModule } from '@nestjs/testing';
import { CompanyRevenueOptionsService } from './company-revenue-options.service';

describe('CompanyRevenueOptionsService', () => {
  let service: CompanyRevenueOptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyRevenueOptionsService],
    }).compile();

    service = module.get<CompanyRevenueOptionsService>(CompanyRevenueOptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
