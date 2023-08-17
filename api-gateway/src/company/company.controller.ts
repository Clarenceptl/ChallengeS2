import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  ValidationPipe
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyRequest, UpdateCompanyRequest } from './company.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller({
  path: 'companies',
  version: '1'
})
@ApiTags('companies')
@ApiBearerAuth()
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  @HttpCode(200)
  public getCompanies() {
    return this.companyService.getCompanies();
  }

  @Get(':id')
  @HttpCode(200)
  public getCompany(@Param('id') id: string) {
    return this.companyService.getCompany(id);
  }

  @Post()
  @HttpCode(201)
  public createCompany(
    @Body(ValidationPipe) data: CreateCompanyRequest,
    @Req() req: any
  ) {
    const user = req?.user ?? null;
    return this.companyService.createCompany(data, user);
  }

  @Patch(':id')
  @HttpCode(201)
  public updateCompany(
    @Body(ValidationPipe) data: UpdateCompanyRequest,
    @Req() req: any,
    @Param('id') id: string
  ) {
    const user = req?.user ?? null;
    return this.companyService.updateCompany(data, user, id);
  }
}
