import { inject } from '@adonisjs/core'
import { UserRepository } from '#users/respositories/user_repository'
import type { StoreUserDto } from '#users/dtos/store_user_dto'
import type User from '#users/models/user'
import type { AccessToken } from '@adonisjs/auth/access_tokens'

@inject()
export class UserService {
  constructor(private repository: UserRepository) {}

  register(user: StoreUserDto): Promise<User> {
    return this.repository.store(user)
  }

  login(email: string, password: string): Promise<User> {
    return this.repository.attempt(email, password)
  }

  generateAccessToken(user: User): Promise<AccessToken> {
    return this.repository.generateAccessToken(user)
  }
}
