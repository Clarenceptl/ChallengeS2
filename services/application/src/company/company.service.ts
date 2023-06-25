import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { Inject } from '@nestjs/common';
import { SERVICE_CMD, SERVICE_NAME } from '../global';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyDto } from './company.dto';
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

  public async createCompany(company: CompanyDto) {
    try {
      const savedCompany = this.companyRepository.create(company);
      await this.companyRepository.save(savedCompany);
    } catch (error) {
      throw new RpcException('error');
    }
    const resultCompanyEmail: SendEmailRequest = {
      email: company.founder.email,
      firstname: company.founder.firstname
    };

    console.log('envoi email');
    const res = await lastValueFrom(
      this.mailingService.emit<SendEmailRequest>(
        SERVICE_CMD.GET_REGISTER_MAIL,
        resultCompanyEmail
      )
    );
    console.log('response email', res);
    return { success: true, message: 'Company' };
  }

  public async getCompanyById(id) {
    return this.companyRepository.findOne(id);
  }

  public async getCompanies() {
    return this.companyRepository.find();
  }
  public async deleteCompany(id) {
    try {
      const company = await this.companyRepository.findOne(id);
      if (!company) {
        throw new RpcException('Company not found');
      }
      const resultCompanyEmail: SendEmailRequest = {
        // email: company.founder.email,
        email: 'toto@gmail.com',
        // firstname: company.founder.firstname
        firstname: 'toto'
      };

      console.log('envoi email');
      const res = await lastValueFrom(
        this.mailingService.emit<SendEmailRequest>(
          SERVICE_CMD.GET_REGISTER_MAIL,
          resultCompanyEmail
        )
      );
      console.log('response email', res);
      return this.companyRepository.delete(id);
    } catch (error) {
      throw new RpcException('Company not found');
    }
  }

  public async updateCompany(id, company: CompanyDto) {
    try {
      const companyToUpdate = await this.companyRepository.findOne(id);
      if (!companyToUpdate) {
        throw new RpcException('Company not found');
      }
      const updatedCompany = this.companyRepository.create({
        ...companyToUpdate,
        ...company
      });
      await this.companyRepository.save(updatedCompany);
      return updatedCompany;
    } catch (error) {
      throw new RpcException('Company not found');
    }
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
