import { Test, TestingModule } from '@nestjs/testing';
import { CompanyRevenueOptionsController } from './company-revenue-options.controller';

describe('CompanyRevenueOptionsController', () => {
  let controller: CompanyRevenueOptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyRevenueOptionsController]
    }).compile();

    controller = module.get<CompanyRevenueOptionsController>(
      CompanyRevenueOptionsController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
