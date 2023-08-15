import { Controller, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SERVICE_CMD } from 'src/global';
import { UpdateStatusDTO } from './candidates-job-ads.entity';
import { CandidateJobAdsService } from './candidate-job-ads.service';

@Controller()
export class CandidateJobAdsController {
  constructor(
    private readonly candidateJobAdsService: CandidateJobAdsService
  ) {}

  @MessagePattern({ cmd: SERVICE_CMD.UPDATE_STATUS_CANDIDATE })
  public updateStatusCandidate(
    @Payload(ValidationPipe)
    payload: UpdateStatusDTO
  ) {
    return this.candidateJobAdsService.updateStatusCandidate(payload);
  }
}
