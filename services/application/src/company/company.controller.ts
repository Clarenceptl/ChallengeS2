import { CompanyService } from './company.service';
import { SERVICE_CMD } from '../global';
import { MessagePattern } from '@nestjs/microservices';
import { CreateCompanyRequest } from './company.dto';

export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @MessagePattern({ cmd: SERVICE_CMD.GET_COMPANIES })
  public async getCompanies() {
    return await this.companyService.getCompanies();
  }

  @MessagePattern({ cmd: SERVICE_CMD.GET_COMPANY })
  public async getCompany(id: string) {
    return await this.companyService.getCompany(id);
  }

  @MessagePattern({ cmd: SERVICE_CMD.GET_COMPANY_BY_ID })
  public async getCompanyById(id) {
    return await this.companyService.getCompanyById(id);
  }

  @MessagePattern({ cmd: SERVICE_CMD.CREATE_COMPANY })
  public async createCompany(data: CreateCompanyRequest) {
    return await this.companyService.createCompany(data);
  }
}
