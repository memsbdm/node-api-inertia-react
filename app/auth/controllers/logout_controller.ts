import { inject } from '@adonisjs/core'
import { AuthService } from '#auth/services/auth_service'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class LogoutController {
  constructor(private authService: AuthService) {}

  async execute({ auth, response }: HttpContext) {
    await auth.use('web').logout()

    return response.redirect().toPath('/')
  }

  async apiExecute({ auth, response }: HttpContext) {
    const user = await auth.authenticateUsing(['api'])
    await this.authService.revokeAccessToken(user, user.currentAccessToken!.identifier)
    return response.status(200)
  }
}
