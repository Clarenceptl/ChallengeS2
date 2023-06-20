import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { Inject } from '@nestjs/common';
import { SERVICE_CMD, SERVICE_NAME } from '../global';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyDto } from './company.dto';
import { SendEmailRequest } from '../users/users.dto';
import { lastValueFrom } from 'rxjs';

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
}
