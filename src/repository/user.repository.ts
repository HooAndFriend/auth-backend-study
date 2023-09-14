// ** Module Imports
import { Service } from 'typedi'
import { Repository } from 'typeorm'

// ** Custom Module Imports
import dataSource from 'config/database'
import User from 'domain/user.entity'

@Service()
export default class UserRepository {
  constructor() {
    this.dataSource = dataSource.getRepository(User)
  }

  public dataSource: Repository<User>

  public async findUserForLogin(username: string) {
    const queryBuilder = this.dataSource
      .createQueryBuilder('user')
      .select(['user.id', 'user.username', 'user.password', 'user.regDate'])
      .where('user.username = :username', {
        username,
      })

    return await queryBuilder.getOne()
  }
}
