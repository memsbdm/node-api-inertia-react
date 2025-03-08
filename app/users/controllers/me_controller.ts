import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class MeController {
  constructor() {}

  render({ inertia }: HttpContext) {
    return inertia.render('me/profile')
  }

  async executeApi({ auth }: HttpContext) {
    return auth!.user
  }
}
