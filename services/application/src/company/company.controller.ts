import { CompanyService } from './company.service';
import { SERVICE_CMD } from '../global';
import { MessagePattern } from '@nestjs/microservices';
import { CompanyDto } from './company.dto';
import { Body, Param, ValidationPipe } from '@nestjs/common';

export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @MessagePattern({ cmd: SERVICE_CMD.CREATE_COMPANY })
  public async createCompany(company: CompanyDto) {
    return this.companyService.createCompany(company);
  }

  @MessagePattern({ cmd: SERVICE_CMD.DELETE_COMPANY })
  public async deleteCompany(id) {
    return this.companyService.deleteCompany(id);
  }

  @MessagePattern({ cmd: SERVICE_CMD.UPDATE_COMPANY })
  public async updateCompany(id, company: CompanyDto) {
    return this.companyService.updateCompany(id, company);
  }

  @MessagePattern({ cmd: SERVICE_CMD.GET_COMPANY_BY_ID })
  public async getCompanyById(id) {
    return this.companyService.getCompanyById(id);
  }

  @MessagePattern({ cmd: SERVICE_CMD.GET_COMPANIES })
  public async getCompany(@Body(ValidationPipe) id) {
    return this.companyService.getCompanies();
  }
}
