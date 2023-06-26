import { Controller, ValidationPipe } from '@nestjs/common';
import { CompanySizeOptionsService } from './company-size-options.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Roles, SERVICE_CMD } from 'src/global';
import {
  CreateCompanySizeOptionRequest,
  GetCompanySizeOptionsByIdRequest,
  UpdateCompanySizeOptionRequest
} from './company-size-options.dto';
import { UserRole } from 'src/users/users.entity';

@Controller()
export class CompanySizeOptionsController {
  constructor(
    private readonly companySizeOptionsService: CompanySizeOptionsService
  ) {}

  @MessagePattern({ cmd: SERVICE_CMD.GET_COMPANY_SIZE_OPTIONS })
  public getCompanySizeOptions() {
    return this.companySizeOptionsService.getCompanySizeOptions();
  }

  @MessagePattern({ cmd: SERVICE_CMD.GET_COMPANY_SIZE_OPTIONS_BY_ID })
  public getCompanySizeOptionsById(@Payload(ValidationPipe) id: string) {
    return this.companySizeOptionsService.getCompanySizeOptionsById(id);
  }

  @MessagePattern({ cmd: SERVICE_CMD.CREATE_COMPANY_SIZE_OPTIONS })
  @Roles(UserRole.ROLE_ADMIN)
  public createCompanySizeOptions(
    @Payload(ValidationPipe)
    data: CreateCompanySizeOptionRequest
  ) {
    return this.companySizeOptionsService.createCompanySizeOptions(data);
  }

  @MessagePattern({ cmd: SERVICE_CMD.UPDATE_COMPANY_SIZE_OPTIONS })
  @Roles(UserRole.ROLE_ADMIN)
  public updateCompanySizeOptions(
    @Payload(ValidationPipe)
    payload: UpdateCompanySizeOptionRequest
  ) {
    const { size, id } = payload;
    return this.companySizeOptionsService.updateCompanySizeOptions(size, id);
  }

  @MessagePattern({ cmd: SERVICE_CMD.DELETE_COMPANY_SIZE_OPTIONS })
  @Roles(UserRole.ROLE_ADMIN)
  public deleteCompanySizeOptions(
    @Payload(ValidationPipe) payload: GetCompanySizeOptionsByIdRequest
  ) {
    const { id } = payload;
    return this.companySizeOptionsService.deleteCompanySizeOptions(id);
  }
}
