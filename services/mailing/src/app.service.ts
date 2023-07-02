import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import {
  ConfirmationAccount,
  RegisterMailBO,
  RegisterMailRequest
} from './models/dto';

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

  public async registerBo(data: RegisterMailBO): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: data.email,
        from: 'noreply@analytics.com',
        subject: 'Bientôt parmi nous ✔',
        template: 'registerBackoffice', // The `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
          name: data.fullname
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async confirmation(data: ConfirmationAccount): Promise<void> {
    const equipe: string = data.equipe ?? 'larudakote';
    const mail = data.valid ? 'confirmationMail' : 'refusValidationMail';
    try {
      await this.mailerService.sendMail({
        to: data.email,
        from: `noreply@${equipe}.com`,
        subject: 'Votre compte a été confirmé ✔',
        template: mail, // The `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
          equipe
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}
