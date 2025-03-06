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

router.on('/').renderInertia('home').as('home')

// Auth
router
  .group(() => {
    router.get('/auth/register', [RegisterController, 'render']).as('auth.register.render')
    router.post('/auth/register', [RegisterController, 'execute']).as('auth.register.execute')
  })
  .middleware(middleware.guest())

// Users
router
  .on('/me/profile')
  .renderInertia('me/profile')
  .middleware(middleware.auth())
  .as('me.profile.render')
