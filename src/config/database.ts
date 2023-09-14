import { DataSource } from 'typeorm'
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME } from '.'

/**
 * 데이터베이스 커넥션을 생성한다.
 */
const dataSource = new DataSource({
  type: 'mysql',
  host: DB_HOST,
  port: +DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: ['./src/domain/*{.js,.ts}'],
  synchronize: true,
})

export default dataSource
