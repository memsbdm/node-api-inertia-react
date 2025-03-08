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
      isRememberMe: vine.boolean().optional(),
    })
  )

  constructor(private authService: AuthService) {}

  render({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async execute({ request, auth, response }: HttpContext) {
    const { email, password, isRememberMe } = await request.validateUsing(
      LoginController.LoginValidator
    )
    const user = await this.authService.attempt(email, password)
    await auth.use('web').login(user, !!isRememberMe)

    return response.redirect().toPath(tuyau.$url('me.render'))
  }

  async apiExecute({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(LoginController.LoginValidator)
    const user = await this.authService.attempt(email, password)
    const token = await this.authService.generateAccessToken(user)
    return response.status(200).json({
      accessToken: {
        type: 'bearer',
        value: token.value!.release(),
      },
      user,
    })
  }
}
