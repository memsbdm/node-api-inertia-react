import { inject } from '@adonisjs/core'
import { UserRepository } from '#users/respositories/user_repository'
import type { StoreUserDto } from '#users/dtos/store_user_dto'
import type User from '#users/models/user'
import type { AccessToken } from '@adonisjs/auth/access_tokens'
import { TokenService } from '#tokens/services/token_service'
import { MailService } from '#core/services/mail_service'
import { TokenType } from '#tokens/enums/token_type'
import env from '#start/env'
import router from '@adonisjs/core/services/router'

@inject()
export class UserService {
  constructor(
    private repository: UserRepository,
    private tokenService: TokenService,
    private mailService: MailService
  ) {}

  async register(user: StoreUserDto): Promise<User> {
    const createdUser = await this.repository.store(user)
    const token = await this.tokenService.generateTokenOfType(TokenType.VerifyEmail, createdUser)

    await this.mailService.sendLater(
      'mehmetbdm@outlook.fr',
      'Welcome to our app',
      'emails/verify_email',
      {
        user: createdUser,
        url: buildVerifyEmailUrl(token),
      }
    )

    return createdUser
  }

  login(email: string, password: string): Promise<User> {
    return this.repository.attempt(email, password)
  }

  generateAccessToken(user: User): Promise<AccessToken> {
    return this.repository.generateAccessToken(user)
  }

  revokeAccessToken(user: User, tokenID: string | number | BigInt): Promise<number> {
    return this.repository.revokeAccessToken(user, tokenID)
  }

  async verifyEmail(user: User): Promise<void> {
    return this.repository.verifyEmail(user)
  }
}

function buildVerifyEmailUrl(token: string): string {
  const domain = env.get('DOMAIN')
  const path = router.builder().params({ token: token }).make('me.verify-email.execute')
  return `${domain}${path}`
}
