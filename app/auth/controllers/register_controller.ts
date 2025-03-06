import { UserService } from '#users/services/user_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import { tuyau } from '#inertia/core/providers/tuyau'

@inject()
export default class RegisterController {
  static StoreUserValidator = vine.compile(
    vine.object({
      firstName: vine.string().trim().minLength(1).maxLength(50).toLowerCase(),
      lastName: vine.string().trim().minLength(1).maxLength(50).toLowerCase(),
      email: vine
        .string()
        .email()
        .toLowerCase()
        .unique(async (db, value) => {
          const user = await db.from('users').where('email', value).first()
          return !user
        }),
      password: vine.string().minLength(8).confirmed({ confirmationField: 'passwordConfirmation' }),
    })
  )

  constructor(private service: UserService) {}

  render({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  async execute({ auth, request, response }: HttpContext) {
    const payload = await request.validateUsing(RegisterController.StoreUserValidator, {
      messagesProvider: new SimpleMessagesProvider({ confirmed: 'Passwords do not match.' }),
    })

    const user = await this.service.register(payload)
    await auth.use('web').login(user)

    return response.redirect().toPath(tuyau.$url('me.profile.render'))
  }

  async apiExecute({ request, response }: HttpContext) {
    const payload = await request.validateUsing(RegisterController.StoreUserValidator, {
      messagesProvider: new SimpleMessagesProvider({ confirmed: 'Passwords do not match.' }),
    })

    const user = await this.service.register(payload)
    const token = await this.service.generateAccessToken(user)

    return response.status(200).json({
      accessToken: {
        type: 'bearer',
        value: token.value!.release(),
      },
      user,
    })
  }
}
