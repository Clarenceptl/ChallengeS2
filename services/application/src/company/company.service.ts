import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { SERVICE_NAME, SuccessResponse } from '../global';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCompany, UpdateCompanyDto } from './company.dto';
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
@Injectable()
export class CompanyService {
  public constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(SERVICE_NAME.MAILING)
    private readonly mailingService: ClientProxy
  ) {}

  public async createCompany(
    company: CreateCompany,
    user: User
  ): Promise<SuccessResponse> {
    const isEmployer: boolean = user.roles.includes(UserRole.ROLE_EMPLOYEUR);
    if (isEmployer) {
      throw new RpcException({
        statusCode: 403,
        message: 'You are not allowed to create a company'
      });
    } else {
      let res: Company;
      try {
        const newCompany = this.companyRepository.create({
          ...company,
          employees: [user]
        });
        newCompany.created_at = new Date();
        newCompany.updated_at = new Date();
        res = await this.companyRepository.save(newCompany);
        const userToUpdate = await this.userRepository.findOneBy({
          id: user.id
        });
        userToUpdate.roles.push(UserRole.ROLE_EMPLOYEUR);
        userToUpdate.company = res;
        await this.userRepository.save(userToUpdate);
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
  }

  public async updateCompany(
    payload: UpdateCompanyDto
  ): Promise<SuccessResponse> {
    const { id, company, tokenUser } = payload;
    if (tokenUser.company.id !== parseInt(id)) {
      throw new RpcException({
        statusCode: 403,
        message: 'You are not allowed to update this company'
      });
    }

    try {
      await this.companyRepository.update({ id: parseInt(id) }, company);
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        message: error.message
      });
    }
    return {
      success: true,
      data: 'Company updated successfully'
    };
  }

  public async getCompanyById(id: string): Promise<SuccessResponse> {
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

  public async getCompanies(): Promise<SuccessResponse> {
    let res: Company[];
    try {
      res = await this.companyRepository.find({
        order: {
          id: 'ASC'
        }
      });
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
      roles: [UserRole.ROLE_USER, UserRole.ROLE_EMPLOYEUR],
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
