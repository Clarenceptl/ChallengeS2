import { Test, TestingModule } from '@nestjs/testing';
import { JobAdsController } from './job-ads.controller';

describe('JobAdsController', () => {
  let controller: JobAdsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobAdsController],
    }).compile();

    controller = module.get<JobAdsController>(JobAdsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
