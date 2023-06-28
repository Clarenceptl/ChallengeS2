import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  ValidationPipe
} from '@nestjs/common';
import { CompanySizeOptionsService } from './company-size-options.service';
import { CreateCompanySizeOptionRequest } from './company-size-options.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Company Size Options')
@ApiBearerAuth()
@Controller({
  path: 'company-size-options',
  version: '1'
})
export class CompanySizeOptionsController {
  constructor(
    private readonly companySizeOptionsService: CompanySizeOptionsService
  ) {}
  @Get()
  @HttpCode(200)
  public getCompanySizeOptions() {
    return this.companySizeOptionsService.getCompanySizeOptions();
  }

  @Get(':id')
  @HttpCode(200)
  public getCompanySizeOptionsById(@Param('id') id: string) {
    return this.companySizeOptionsService.getCompanySizeOptionsById(id);
  }

  @Post()
  @HttpCode(201)
  public createCompanySizeOptions(
    @Body(ValidationPipe) data: CreateCompanySizeOptionRequest,
    @Req() req: any
  ) {
    const tokenUser = req?.user ?? null;
    return this.companySizeOptionsService.createCompanySizeOptions(
      data,
      tokenUser
    );
  }

  @Put(':id')
  @HttpCode(200)
  public updateCompanySizeOptions(
    @Body(ValidationPipe) data: CreateCompanySizeOptionRequest,
    @Param('id') id: string,
    @Req() req: any
  ) {
    const tokenUser = req?.user ?? null;
    return this.companySizeOptionsService.updateCompanySizeOptions(
      data,
      id,
      tokenUser
    );
  }

  @Delete(':id')
  @HttpCode(200)
  public deleteCompanySizeOptions(@Param('id') id: string, @Req() req: any) {
    const tokenUser = req?.user ?? null;
    return this.companySizeOptionsService.deleteCompanySizeOptions(
      id,
      tokenUser
    );
  }
}
