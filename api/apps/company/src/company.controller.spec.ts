import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

describe('CompanyController', () => {
  let companyController: CompanyController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [CompanyService],
    }).compile();

    companyController = app.get<CompanyController>(CompanyController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(companyController.getHello()).toBe('Hello World!');
    });
  });
});
