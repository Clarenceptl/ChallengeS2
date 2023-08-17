import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  ValidationPipe
} from '@nestjs/common';
import { CompanyRevenueOptionsService } from './company-revenue-options.service';
import { CreateCompanyRevenueOptionRequest } from './company-revenue-options.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Company Revenue Options')
@ApiBearerAuth()
@Controller({
  path: 'company-revenue-options',
  version: '1'
})
export class CompanyRevenueOptionsController {
  constructor(
    private readonly companyRevenueOptionsService: CompanyRevenueOptionsService
  ) {}

  @Get()
  @HttpCode(200)
  public getCompanyRevenueOptions() {
    return this.companyRevenueOptionsService.getCompanyRevenueOptions();
  }

  @Get(':id')
  @HttpCode(200)
  public getCompanyRevenueOptionsById(@Param('id') id: string) {
    return this.companyRevenueOptionsService.getCompanyRevenueOptionsById(id);
  }

  @Post()
  @HttpCode(201)
  public createCompanyRevenueOptions(
    @Body(ValidationPipe) data: CreateCompanyRevenueOptionRequest,
    @Req() req: any
  ) {
    const tokenUser = req?.user ?? null;
    return this.companyRevenueOptionsService.createCompanyRevenueOptions(
      data,
      tokenUser
    );
  }

  @Patch(':id')
  @HttpCode(200)
  public updateCompanyRevenueOptions(
    @Body(ValidationPipe) data: CreateCompanyRevenueOptionRequest,
    @Param('id') id: string,
    @Req() req: any
  ) {
    const tokenUser = req?.user ?? null;
    return this.companyRevenueOptionsService.updateCompanyRevenueOptions(
      data,
      id,
      tokenUser
    );
  }

  @Delete(':id')
  @HttpCode(200)
  public deleteCompanyRevenueOptions(@Param('id') id: string, @Req() req: any) {
    const tokenUser = req?.user ?? null;
    return this.companyRevenueOptionsService.deleteCompanyRevenueOptions(
      id,
      tokenUser
    );
  }
}
