import { Test, TestingModule } from '@nestjs/testing';
import { JobAdvertisementController } from './job-advertisement.controller';
import { JobAdvertisementService } from './job-advertisement.service';

describe('JobAdvertisementController', () => {
  let jobAdvertisementController: JobAdvertisementController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [JobAdvertisementController],
      providers: [JobAdvertisementService],
    }).compile();

    jobAdvertisementController = app.get<JobAdvertisementController>(JobAdvertisementController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(jobAdvertisementController.getHello()).toBe('Hello World!');
    });
  });
});
