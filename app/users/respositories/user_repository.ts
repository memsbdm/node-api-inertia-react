import User from '#users/models/user'
import type { AccessToken } from '@adonisjs/auth/access_tokens'
import type { StoreUserDto } from '#users/dtos/store_user_dto'

export class UserRepository {
  store(user: StoreUserDto): Promise<User> {
    return User.create(user)
  }

  attempt(email: string, password: string): Promise<User> {
    return User.verifyCredentials(email, password)
  }

  generateAccessToken(user: User): Promise<AccessToken> {
    return User.accessTokens.create(user)
  }

  revokeAccessToken(user: User, tokenID: string | number | BigInt): Promise<number> {
    return User.accessTokens.delete(user, tokenID)
  }
}
