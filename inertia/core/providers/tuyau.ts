import { createTuyau } from '@tuyau/client'
import { api } from '../../../.adonisjs/api.js'

export const tuyau = createTuyau({ baseUrl: 'http://localhost:3333', api })
