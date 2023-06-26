import { Controller, ValidationPipe } from '@nestjs/common';
import { CompanySectorOptionsService } from './company-sector-options.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateCompanySectorOptionRequest,
  GetCompanySectorOptionsByIdRequest,
  UpdateCompanySectorOptionRequest
} from './company-sector-options.dto';
import { SERVICE_CMD } from 'src/global';

@Controller('company-sector-options')
export class CompanySectorOptionsController {
  constructor(
    private readonly companySectorOptionsService: CompanySectorOptionsService
  ) {}

  @MessagePattern({ cmd: SERVICE_CMD.GET_COMPANY_SECTOR_OPTIONS })
  public getCompanySectorOptions() {
    return this.companySectorOptionsService.getCompanySectorOptions();
  }

  @MessagePattern({ cmd: SERVICE_CMD.GET_COMPANY_SECTOR_OPTIONS_BY_ID })
  public getCompanySectorOptionsById(
    @Payload(ValidationPipe) payload: GetCompanySectorOptionsByIdRequest
  ) {
    const { id } = payload;
    return this.companySectorOptionsService.getCompanySectorOptionsById(id);
  }

  @MessagePattern({ cmd: SERVICE_CMD.CREATE_COMPANY_SECTOR_OPTIONS })
  public createCompanySizeOptions(data: CreateCompanySectorOptionRequest) {
    return this.companySectorOptionsService.createCompanySectorOptions(data);
  }

  @MessagePattern({ cmd: SERVICE_CMD.UPDATE_COMPANY_SECTOR_OPTIONS })
  public updateCompanySectorOptions(
    @Payload(ValidationPipe)
    payload: UpdateCompanySectorOptionRequest
  ) {
    console.log('updateCompanySizeOptions');
    console.log(payload);
    const { sector, id } = payload;
    return this.companySectorOptionsService.updateCompanySectorOptions(
      sector,
      id
    );
  }

  @MessagePattern({ cmd: SERVICE_CMD.DELETE_COMPANY_SECTOR_OPTIONS })
  public deleteCompanySectorOptions(
    @Payload(ValidationPipe) payload: GetCompanySectorOptionsByIdRequest
  ) {
    const { id } = payload;
    return this.companySectorOptionsService.deleteCompanySectorOptions(id);
  }
}
