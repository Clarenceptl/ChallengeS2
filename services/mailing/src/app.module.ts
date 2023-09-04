import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: process.env.MAIL_URL_SMTP ?? {
        host: 'mailcatcher',
        port: 1025,
        ignoreTLS: true,
        secure: false
      },
      defaults: {
        from: '"larudakoé" <noreply@larudakote.com>'
      },

      template: {
        dir: __dirname + '/mails/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true
        }
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
