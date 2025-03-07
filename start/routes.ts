/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import { throttle, verifyEmailLimiter } from './limiter.js'
const RegisterController = () => import('#auth/controllers/register_controller')
const LoginController = () => import('#auth/controllers/login_controller')
const LogoutController = () => import('#auth/controllers/logout_controller')
const VerifyEmailController = () => import('#users/controllers/verify_email_controller')

/*
 * Inertia Routes
 */

router.on('/').renderInertia('home').as('home')

// Auth
router
  .group(() => {
    router.get('/auth/register', [RegisterController, 'render']).as('auth.register.render')
    router.post('/auth/register', [RegisterController, 'execute']).as('auth.register.execute')
    router.get('/auth/login', [LoginController, 'render']).as('auth.login.render')
    router.post('/auth/login', [LoginController, 'execute']).as('auth.login.execute')
  })
  .middleware(middleware.guest())

router
  .delete('/auth/logout', [LogoutController, 'execute'])
  .middleware(middleware.auth())
  .as('auth.logout.execute')

// Users
router
  .on('/me/profile')
  .renderInertia('me/profile')
  .middleware(middleware.auth())
  .as('me.profile.render')

router
  .get('/me/verify-email', [VerifyEmailController, 'render'])
  .middleware(middleware.auth())
  .as('me.verify-email.render')

router
  .get('/me/verify-email/:token', [VerifyEmailController, 'execute'])
  .as('me.verify-email.execute')

router
  .post('/me/verify-email/resend', [VerifyEmailController, 'resend'])
  .middleware(middleware.auth())
  .use(verifyEmailLimiter)
  .as('me.verify-email.resend')

/*
 * API Routes
 */

router
  .group(() => {
    // Auth
    router
      .group(() => {
        router.post('/auth/login', [LoginController, 'apiExecute']).as('auth.login.apiExecute')
        router
          .post('/auth/register', [RegisterController, 'apiExecute'])
          .as('auth.register.apiExecute')
      })
      .middleware(middleware.guest({ guards: ['api'] }))

    router
      .group(() => {
        router.delete('/auth/logout', [LogoutController, 'apiExecute']).as('auth.logout.apiExecute')
      })
      .middleware(middleware.auth({ guards: ['api'] }))

    // Users
    router
      .post('/me/verify-email/resend', [VerifyEmailController, 'apiResend'])
      .as('me.verify-email.apiResend')
      .middleware(middleware.auth({ guards: ['api'] }))
      .use(verifyEmailLimiter)
  })
  .prefix('api/v1')
  .use(throttle)
