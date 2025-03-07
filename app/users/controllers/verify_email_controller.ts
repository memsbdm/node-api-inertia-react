import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { TokenService } from '#tokens/services/token_service'
import { UserService } from '#users/services/user_service'
import { TokenType } from '#tokens/enums/token_type'

@inject()
export default class VerifyEmailController {
  constructor(
    private tokenService: TokenService,
    private userService: UserService
  ) {}

  render({ inertia }: HttpContext) {
    return inertia.render('tokens/verify_email_sent')
  }

  async execute({ params, inertia }: HttpContext) {
    const user = await this.tokenService.getTokenUser(params.token, TokenType.VerifyEmail)

    if (!user) {
      return inertia.render('tokens/verify_email_token_validation', { valid: false })
    }

    await this.userService.verifyEmail(user)
    await this.tokenService.expireTokensOfType(TokenType.VerifyEmail, user)

    return inertia.render('tokens/verify_email_token_validation', { valid: true })
  }

  async resend({ auth, response }: HttpContext) {
    const user = auth.user!

    if (user.isEmailVerified) {
      return response.redirect().back()
    }

    await this.userService.sendVerificationEmail(user)

    return response.redirect().back()
  }
}
