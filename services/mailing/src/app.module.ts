import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

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
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule {}
