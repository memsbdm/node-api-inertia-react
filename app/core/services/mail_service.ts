import env from '#start/env'
import { inject } from '@adonisjs/core'
import mail from '@adonisjs/mail/services/main'

@inject()
export class MailService {
  sendLater(
    to: string,
    subject: string,
    template: string,
    data?: Record<string, unknown>
  ): Promise<void> {
    if (env.get('NODE_ENV') !== 'production') {
      to = 'mehmetbdm@outlook.fr'
    }
    return mail.sendLater((message) => {
      message.to(to).from(env.get('AWS_FROM_EMAIL')).subject(subject).htmlView(template, data)
    })
  }
}
