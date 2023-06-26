import { Test, TestingModule } from '@nestjs/testing';
import { CompanySectorOptionsController } from './company-sector-options.controller';

describe('CompanySectorOptionsController', () => {
  let controller: CompanySectorOptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanySectorOptionsController]
    }).compile();

    controller = module.get<CompanySectorOptionsController>(
      CompanySectorOptionsController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
