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
import { CompanySectorOptionsService } from './company-sector-options.service';
import { CreateCompanySectorOptionRequest } from './company-sector-options.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Company Sector Options')
@ApiBearerAuth()
@Controller({
  path: 'company-sector-options',
  version: '1'
})
export class CompanySectorOptionsController {
  constructor(
    private readonly companySectorOptionsService: CompanySectorOptionsService
  ) {}

  @Get()
  @HttpCode(200)
  public getCompanySectorOptions() {
    return this.companySectorOptionsService.getCompanySectorOptions();
  }

  @Get(':id')
  @HttpCode(200)
  public getCompanySectorOptionById(@Param('id') id: string) {
    return this.companySectorOptionsService.getCompanySectorOptionById(id);
  }

  @Post()
  @HttpCode(201)
  public createCompanySectorOption(
    @Body(ValidationPipe) data: CreateCompanySectorOptionRequest,
    @Req() req: any
  ) {
    const tokenUser = req?.user ?? null;
    return this.companySectorOptionsService.createCompanySectorOption(
      data,
      tokenUser
    );
  }

  @Patch(':id')
  @HttpCode(200)
  public updateCompanySectorOption(
    @Body(ValidationPipe) data: CreateCompanySectorOptionRequest,
    @Param('id') id: string,
    @Req() req: any
  ) {
    const tokenUser = req?.user ?? null;
    return this.companySectorOptionsService.updateCompanySectorOption(
      data,
      id,
      tokenUser
    );
  }

  @Delete(':id')
  @HttpCode(200)
  public deleteCompanySectorOption(@Param('id') id: string, @Req() req: any) {
    const tokenUser = req?.user ?? null;
    return this.companySectorOptionsService.deleteCompanySectorOption(
      id,
      tokenUser
    );
  }
}
