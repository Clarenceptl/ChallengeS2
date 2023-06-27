import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { Inject } from '@nestjs/common';
import { SERVICE_CMD, SERVICE_NAME, SuccessResponse } from '../global';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyDto, CreateCompanyRequest } from './company.dto';
import { SendEmailRequest } from '../users/users.dto';
import { lastValueFrom } from 'rxjs';
import { User, UserRole } from 'src/users/users.entity';
import { encryptPassword } from 'src/helpers';
import { CompanySizeOptions } from 'src/company-size-options/company-size-option.entity';
import { CompanySectorOptions } from 'src/company-sector-options/company-sector-options.entity';
import { CompanyRevenueOptions } from 'src/company-revenue-options/company-revenue-options.entity';

interface CompanyOptions {
  companySizeOptions: CompanySizeOptions;
  companyRevenueOptions: CompanyRevenueOptions;
  companySectorOptions: CompanySectorOptions;
}
export class CompanyService {
  public constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @Inject(SERVICE_NAME.MAILING)
    private readonly mailingService: ClientProxy
  ) {}

  public async createCompany(
    company: CreateCompanyRequest
  ): Promise<SuccessResponse> {
    let res: Company;
    try {
      const newCompany = this.companyRepository.create(company);
      res = await this.companyRepository.save(newCompany);
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        message: error.message
      });
    }
    return {
      success: true,
      data: res
    };
  }

  public async getCompanyById(id) {
    return this.companyRepository.findOne(id);
  }

  public async getCompanies(): Promise<SuccessResponse> {
    let res: Company[];
    try {
      res = await this.companyRepository.find({
        order: {
          id: 'ASC'
        }
      });
      console.log('res', res);
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        message: error.message
      });
    }
    return {
      success: true,
      data: res
    };
  }

  public async getCompany(id: string): Promise<SuccessResponse> {
    let res: Company;
    try {
      res = await this.companyRepository.findOneBy({ id: parseInt(id) });
      if (!res) {
        throw new RpcException({
          statusCode: 404,
          message: 'Company not found'
        });
      }
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        message: error.message
      });
    }
    return {
      success: true,
      data: res
    };
  }

  public async seed(options: CompanyOptions) {
    await this.companyRepository.delete({});
    const { companyRevenueOptions, companySectorOptions, companySizeOptions } =
      options;
    const employeur = new User();
    const password: string = encryptPassword('password');
    Object.assign(employeur, {
      email: 'employeur@employeur.com',
      password: password,
      firstname: 'employeur',
      lastname: 'John',
      birthdate: '01/01/1990',
      role: UserRole.ROLE_EMPLOYEUR,
      isVerified: true
    });

    const company1 = this.companyRepository.create({
      name: 'Company 1',
      description: 'lorem ipsum dolar sit amet',
      creationDate: new Date(),
      address: '1 rue de la paix',
      website: 'www.company1.com',
      founder: 'elodie 1',
      siret: 123456789,
      size: companySizeOptions,
      sector: companySectorOptions,
      revenue: companyRevenueOptions
    });
    const company2 = this.companyRepository.create({
      name: 'Company 2',
      description: 'lorem ipsum dolar sit amet',
      creationDate: new Date(),
      address: '2 rue de la paix',
      website: 'www.company2.com',
      founder: employeur.getFullName(),
      siret: 123456789,
      employees: [employeur],
      size: companySizeOptions,
      sector: companySectorOptions,
      revenue: companyRevenueOptions
    });
    const company3 = this.companyRepository.create({
      name: 'Company 3',
      description: 'lorem ipsum dolar sit amet',
      creationDate: new Date(),
      address: '3 rue de la paix',
      website: 'www.company3.com',
      founder: 'elodie 3',
      siret: 123456789,
      size: companySizeOptions,
      sector: companySectorOptions,
      revenue: companyRevenueOptions
    });
    await this.companyRepository.save([company1, company2, company3]);
  }
}
