import { Controller, ValidationPipe } from '@nestjs/common';
import { CompanyRevenueOptionsService } from './company-revenue-options.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Roles, SERVICE_CMD } from 'src/global';
import {
  CreateCompanyRevenueOptionRequest,
  GetCompanyRevenueOptionsByIdRequest,
  UpdateCompanyRevenueOptionRequest
} from './company-revenue-options.dto';
import { UserRole } from 'src/users/users.entity';

@Controller('company-revenue-options')
export class CompanyRevenueOptionsController {
  constructor(
    private readonly companyRevenueOptionsService: CompanyRevenueOptionsService
  ) {}

  @MessagePattern({ cmd: SERVICE_CMD.GET_COMPANY_REVENUE_OPTIONS })
  public async getCompanyRevenueOptions() {
    return await this.companyRevenueOptionsService.getCompanyRevenueOptions();
  }

  @MessagePattern({ cmd: SERVICE_CMD.GET_COMPANY_REVENUE_OPTIONS_BY_ID })
  public async getCompanyRevenueOptionsById(
    payload: GetCompanyRevenueOptionsByIdRequest
  ) {
    const { id } = payload;
    return await this.companyRevenueOptionsService.getCompanyRevenueOptionsById(
      id
    );
  }

  @MessagePattern({ cmd: SERVICE_CMD.CREATE_COMPANY_REVENUE_OPTIONS })
  @Roles(UserRole.ROLE_ADMIN)
  public async createCompanyRevenueOptions(
    data: CreateCompanyRevenueOptionRequest
  ) {
    return await this.companyRevenueOptionsService.createCompanyRevenueOptions(
      data
    );
  }

  @MessagePattern({ cmd: SERVICE_CMD.UPDATE_COMPANY_REVENUE_OPTIONS })
  @Roles(UserRole.ROLE_ADMIN)
  public async updateCompanyRevenueOptions(
    @Payload(ValidationPipe)
    payload: UpdateCompanyRevenueOptionRequest
  ) {
    const { revenue, id } = payload;
    return await this.companyRevenueOptionsService.updateCompanyRevenueOptions(
      revenue,
      id
    );
  }

  @MessagePattern({ cmd: SERVICE_CMD.DELETE_COMPANY_REVENUE_OPTIONS })
  @Roles(UserRole.ROLE_ADMIN)
  public async deleteCompanyRevenueOptions(
    payload: GetCompanyRevenueOptionsByIdRequest
  ) {
    const { id } = payload;
    return await this.companyRevenueOptionsService.deleteCompanyRevenueOptions(
      id
    );
  }
}
