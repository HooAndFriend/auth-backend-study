// ** Module Imports
import { Service } from 'typedi'
import { Repository } from 'typeorm'

// ** Custom Module Imports
import dataSource from 'config/database'
import Call from 'domain/call.entity'

@Service()
export default class CallRepository {
  constructor() {
    this.dataSource = dataSource.getRepository(Call)
  }

  public dataSource: Repository<Call>

  public async findCallsByName(name: string) {
    const queryBuilder = this.dataSource
      .createQueryBuilder('call')
      .select([
        'call.id',
        'call.name',
        'call.number',
        'call.regDate',
        'call.modDate',
      ])
      .where('call.name LIKE :name', {
        name: `%${name}%`,
      })

    return await queryBuilder.getManyAndCount()
  }
}
