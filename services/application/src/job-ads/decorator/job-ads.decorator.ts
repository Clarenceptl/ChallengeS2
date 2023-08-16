import { UseInterceptors } from '@nestjs/common';
import { CleanResponseJobAdsInterceptor } from './job-ads.interceptor';

export const CleanResponseJobAds = () =>
  UseInterceptors(CleanResponseJobAdsInterceptor);
