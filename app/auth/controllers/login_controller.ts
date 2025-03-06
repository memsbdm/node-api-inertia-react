import { inject } from '@adonisjs/core'
import vine from '@vinejs/vine'
import { tuyau } from '#inertia/core/providers/tuyau'
import { AuthService } from '#auth/services/auth_service'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class LoginController {
  static LoginValidator = vine.compile(
    vine.object({
      email: vine.string().trim().toLowerCase().email(),
      password: vine.string(),
    })
  )

  constructor(private authService: AuthService) {}

  render({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async execute({ request, auth, response }: HttpContext) {
    const { email, password } = await request.validateUsing(LoginController.LoginValidator)
    const user = await this.authService.attempt(email, password)
    await auth.use('web').login(user)

    return response.redirect().toPath(tuyau.$url('me.profile.render'))
  }

  async apiExecute({ request }: HttpContext) {
    const { email, password } = await request.validateUsing(LoginController.LoginValidator)
    const user = await this.authService.attempt(email, password)
    const token = await this.authService.generateAccessToken(user)
    return {
      accessToken: {
        type: 'bearer',
        value: token.value!.release(),
      },
      user,
    }
  }
}
