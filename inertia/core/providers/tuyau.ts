import { createTuyau } from '@tuyau/client'
import { api } from '../../../.adonisjs/api.js'
import env from '#start/env'

export const tuyau = createTuyau({ baseUrl: env.get('DOMAIN'), api })
