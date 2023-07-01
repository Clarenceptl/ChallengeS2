import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { RegisterMailRequest } from './models/dto';

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {}

  public async register(data: RegisterMailRequest): Promise<void> {
    const url = process.env.FRONTEND_URL + '/verify-account/' + data.token;
    try {
      await this.mailerService.sendMail({
        to: data.email,
        from: 'noreply@larudakote.com',
        subject: 'Veuillez confirmer votre email ✔',
        template: 'registerMail', // The `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
          url,
          token: data.token,
          firstname: data.firstname
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}
