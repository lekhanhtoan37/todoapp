const dotenv = require('dotenv')
dotenv.config()
module.exports = {
  type: 'mysql',
  host: process.env['DB_HOST'] || 'localhost',
  port: +process.env['DB_PORT'] || 3306,
  username: process.env['DB_USERNAME'] || 'root',
  password: process.env['DB_PASSWORD'] || '1234',
  database: process.env['DB_DATABASE'] || 'todo',
  synchronize: false,
  logging: !!(+process.env['LOG_QUERY'] || 0),
  entities: ['libs/mysql/src/entities/*.entity{.ts,.js}'],
  migrations: ['libs/mysql/src/migrations/**/*{.ts,.js}'],
  subscribers: ['libs/mysql/src/**/*.{.ts,.js}'],
  cli: {
    entitiesDir: 'libs/mysql/src/entities',
    migrationsDir: 'libs/mysql/src/migrations',
  },
}
