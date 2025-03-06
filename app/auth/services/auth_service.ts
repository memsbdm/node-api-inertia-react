import { inject } from '@adonisjs/core'
import User from '#users/models/user'
import { UserService } from '#users/services/user_service'
import type { AccessToken } from '@adonisjs/auth/access_tokens'

@inject()
export class AuthService {
  constructor(private userService: UserService) {}

  attempt(email: string, password: string): Promise<User> {
    return this.userService.login(email, password)
  }

  generateAccessToken(user: User): Promise<AccessToken> {
    return this.userService.generateAccessToken(user)
  }

  revokeAccessToken(user: User, tokenID: string | number | BigInt): Promise<number> {
    return this.userService.revokeAccessToken(user, tokenID)
  }
}
