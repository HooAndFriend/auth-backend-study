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
}
