import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import type { StatusPageRange, StatusPageRenderer } from '@adonisjs/core/types/http'
import { errors as authErrors } from '@adonisjs/auth'
import { errors as limiterErrors } from '@adonisjs/limiter'

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * Status pages are used to display a custom HTML pages for certain error
   * codes. You might want to enable them in production only, but feel
   * free to enable them in development as well.
   */
  protected renderStatusPages = app.inProduction

  /**
   * Status pages is a collection of error code range and a callback
   * to return the HTML contents to send as a response.
   */
  protected statusPages: Record<StatusPageRange, StatusPageRenderer> = {
    '404': (error, { inertia }) => inertia.render('errors/not_found', { error }),
    '500..599': (error, { inertia }) => inertia.render('errors/server_error', { error }),
  }

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: unknown, ctx: HttpContext) {
    const isApiRequest = ctx.request.header('accept') === 'application/json'

    if (isApiRequest) {
      if (error instanceof authErrors.E_INVALID_CREDENTIALS) {
        ctx.response.status(401).send({ errors: [{ message: error.message }] })
        return
      }

      if (error instanceof limiterErrors.E_TOO_MANY_REQUESTS) {
        const headers = error.getDefaultHeaders()
        const timer = headers['Retry-After']
        ctx.response
          .status(429)
          .send({ errors: [{ message: error.message, retryAfterInSeconds: timer }] })
        return
      }
    } else {
      if (error instanceof authErrors.E_INVALID_CREDENTIALS) {
        ctx.session.flashErrors({ code: 'E_INVALID_CREDENTIALS', message: error.message })
        return ctx.response.redirect().back()
      }

      if (error instanceof limiterErrors.E_TOO_MANY_REQUESTS) {
        const headers = error.getDefaultHeaders()
        const timer = headers['Retry-After']
        ctx.session.flashErrors({ code: 'E_TOO_MANY_REQUESTS', timer })
        return ctx.response.redirect().back()
      }
    }

    return super.handle(error, ctx)
  }

  /**
   * The method is used to report error to the logging service or
   * a third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
