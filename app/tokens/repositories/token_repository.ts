import Token from '#tokens/models/token'

import type User from '#users/models/user'

import { DateTime } from 'luxon'

import { TokenRelation, type TokenTypeID } from '#tokens/enums/token_type'

export class TokenRepository {
  expireTokensOfType(tokenType: TokenTypeID, user: User) {
    return user.related(TokenRelation[tokenType]).query().update({
      expiresAt: DateTime.now(),
    })
  }

  getTokenUser(token: string, tokenType: TokenTypeID): Promise<Token | null> {
    return Token.query()

      .preload('user')

      .where('token', token)

      .where('type_id', tokenType)

      .where('expiresAt', '>', DateTime.now().toSQL())

      .orderBy('createdAt', 'desc')

      .first()
  }

  generateTokenOfType(tokenType: TokenTypeID, user: User, token: string): Promise<Token> {
    return user.related(TokenRelation[tokenType]).create({
      typeId: tokenType,

      expiresAt: DateTime.now().plus({ hours: 24 }),

      token,
    })
  }
}
