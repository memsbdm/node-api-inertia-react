import { createTuyau } from '@tuyau/client'
import { api } from '../../../.adonisjs/api.js'

export const tuyau = createTuyau({ baseUrl: 'https://mon-app-49.13.131.206.sslip.io', api })
