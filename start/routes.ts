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
const RegisterController = () => import('#auth/controllers/register_controller')
const LoginController = () => import('#auth/controllers/login_controller')
const LogoutController = () => import('#auth/controllers/logout_controller')
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
