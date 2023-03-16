import { Injectable } from '@nestjs/common';

@Injectable()
export class JobAdvertisementService {
  getHello(): string {
    return 'Hello World!';
  }
}
