import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { Authenticators } from '@adonisjs/auth/types'
import { tuyau } from '#inertia/core/providers/tuyau'

/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class AuthMiddleware {
  /**
   * The URL to redirect to, when authentication fails
   */
  redirectTo = tuyau.$url('auth.login.render')

  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[]
    } = {}
  ) {
    if (options.guards?.includes('api')) {
      let authenticated = await ctx.auth.use('api').check()
      if (!authenticated) {
        return ctx.response.unauthorized({ errors: [{ message: 'Unauthorized' }] })
      }
    } else {
      await ctx.auth.authenticateUsing(options.guards, { loginRoute: this.redirectTo })
    }
    return next()
  }
}
