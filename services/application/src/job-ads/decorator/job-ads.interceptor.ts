import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { removeDataSensibleUser } from '../../helpers';
import { SuccessResponse } from '../../global';
import { CandidatesJobAds } from 'src/entities/candidates-job-ads.entity';

@Injectable()
export class CleanResponseJobAdsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((res: SuccessResponse) => {
        // console.log(res.data.candidatesJobAds);
        const { data } = res;
        let newData: CandidatesJobAds[];
        if (data.candidatesJobAds && data.candidatesJobAds.length > 0) {
          newData = data.candidatesJobAds.map((candidateJobAds) => {
            if (candidateJobAds.candidate) {
              candidateJobAds.candidate = removeDataSensibleUser(
                candidateJobAds.candidate
              );
              delete candidateJobAds.candidate.candidatesJobAds;
              return candidateJobAds;
            }
          });
          res.data.candidatesJobAds = newData;
        }
        return res;
      })
    );
  }
}
