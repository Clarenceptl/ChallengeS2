import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyService {
  getHello(): string {
    return 'Hello World!';
  }
}
