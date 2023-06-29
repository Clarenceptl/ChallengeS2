import { Test, TestingModule } from '@nestjs/testing';
import { JobAdsService } from './job-ads.service';

describe('JobAdsService', () => {
  let service: JobAdsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobAdsService],
    }).compile();

    service = module.get<JobAdsService>(JobAdsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
