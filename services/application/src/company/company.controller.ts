import { Controller, ValidationPipe } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Roles, SERVICE_CMD } from '../global';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UpdateCompanyDto } from './company.dto';
import { UserRole } from 'src/users/users.entity';

@Controller()
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @MessagePattern({ cmd: SERVICE_CMD.GET_COMPANIES })
  public async getCompanies() {
    return await this.companyService.getCompanies();
  }

  @MessagePattern({ cmd: SERVICE_CMD.GET_COMPANY })
  public async getCompany(@Payload(ValidationPipe) id: string) {
    return await this.companyService.getCompany(id);
  }

  @MessagePattern({ cmd: SERVICE_CMD.GET_COMPANY_BY_ID })
  public async getCompanyById(@Payload(ValidationPipe) id: string) {
    return await this.companyService.getCompanyById(id);
  }

  @MessagePattern({ cmd: SERVICE_CMD.CREATE_COMPANY })
  public async createCompany(@Payload(ValidationPipe) payload) {
    const { data, user } = payload;
    return await this.companyService.createCompany(data, user);
  }

  @Roles(UserRole.ROLE_EMPLOYEUR)
  @MessagePattern({ cmd: SERVICE_CMD.UPDATE_COMPANY })
  public async updateCompany(
    @Payload(ValidationPipe) payload: UpdateCompanyDto
  ) {
    return await this.companyService.updateCompany(payload);
  }
}
