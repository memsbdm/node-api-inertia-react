import { inject } from '@adonisjs/core'
import { TokenRepository } from '#tokens/repositories/token_repository'
import type User from '#users/models/user'
import type { TokenTypeID } from '#tokens/enums/token_type'

import string from '@adonisjs/core/helpers/string'

@inject()
export class TokenService {
  constructor(private repository: TokenRepository) {}

  async expireTokensOfType(type: TokenTypeID, user: User): Promise<void> {
    await this.repository.expireTokensOfType(type, user)
  }

  async getTokenUser(token: string, type: TokenTypeID): Promise<User | undefined> {
    const record = await this.repository.getTokenUser(token, type)

    return record?.user
  }

  async generateTokenOfType(tokenType: TokenTypeID, user: User): Promise<string> {
    const token = string.generateRandom(64)
    await this.expireTokensOfType(tokenType, user)
    const record = await this.repository.generateTokenOfType(tokenType, user, token)

    return record.token
  }
}
