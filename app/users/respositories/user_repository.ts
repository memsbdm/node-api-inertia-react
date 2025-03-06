import type { StoreUserDto } from '#users/dtos/store_user_dto'
import User from '#users/models/user'

export class UserRepository {
  store(user: StoreUserDto): Promise<User> {
    return User.create(user)
  }
}
