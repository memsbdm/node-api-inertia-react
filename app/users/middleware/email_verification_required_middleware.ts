import { tuyau } from '#inertia/core/providers/tuyau'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class EmailVerificationRequiredMiddleware {
  async handle({ auth, response, route, request }: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */

    const isApiRoute = request.header('accept')?.includes('application/json')
    let user

    if (isApiRoute) {
      const authenticated = await auth.use('api').check()
      if (authenticated) {
        user = auth.use('api').user
      }
    } else {
      const authenticated = await auth.use('web').check()
      if (authenticated) {
        user = auth.use('web').user
      }
    }

    if (user) {
      const authorizedRoutes: string[] = [
        tuyau.$route('auth.logout.execute').path,
        tuyau.$route('auth.logout.apiExecute').path,
        tuyau.$route('me.verify-email.render').path,
        tuyau.$route('me.verify-email.execute').path,
        tuyau.$route('me.verify-email.resend').path,
        tuyau.$route('me.verify-email.apiResend').path,
      ]

      const isAuthorizedRoute = authorizedRoutes.includes(route!.pattern!)

      if (!isAuthorizedRoute && !user.isEmailVerified) {
        if (isApiRoute) {
          return response.status(403).json({ errors: [{ message: 'Email not verified' }] })
        }

        return response.redirect().toPath(tuyau.$url('me.verify-email.render'))
      }
    }

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
