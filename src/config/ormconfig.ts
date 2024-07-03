// import { ConnectionOptions } from 'typeorm';
// import * as config from 'config';
// import { ConfigModule } from '@nestjs/config';
// ConfigModule.forRoot();

// const dbConfig = config.get('db');
// const ormConfig: ConnectionOptions = {
//   type: process.env.DB_TYPE || dbConfig.type,
//   host: process.env.DB_HOST || dbConfig.host,
//   port: process.env.DB_PORT || dbConfig.port,
//   username: process.env.DB_USERNAME || dbConfig.username,
//   password: process.env.DB_PASSWORD || dbConfig.password,
//   database: process.env.DB_DATABASE_NAME || dbConfig.database,
//   migrationsTransactionMode: 'each',
//   entities: [__dirname + '/../**/*.entity.{js,ts}'],
//   synchronize: process.env.TYPE_ORM_SYNC || dbConfig.synchronize,
//   migrations: [__dirname + '/../database/migrations/**/*{.ts,.js}'],
// //   cli: {
// //     migrationsDir: 'src/database/migrations'
// //   }
// };

// export = ormConfig;


// ormconfig.ts
// import { PostgresConnectionOptions } from 'typeorm';
// import { ConfigService } from '@nestjs/config';
// import * as path from 'path';
// import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

// const dbConfig = {
//   type: process.env.DB_TYPE || 'postgres',
//   host: process.env.DB_HOST || 'localhost',
//   port: parseInt(process.env.DB_PORT, 10) || 5432,
//   username: process.env.DB_USERNAME || 'postgres',
//   password: process.env.DB_PASSWORD || 'password',
//   database: process.env.DB_DATABASE_NAME || 'nestjs_db',
//   synchronize: process.env.TYPEORM_SYNC === 'true' || false,
// };

// const ormConfig: PostgresConnectionOptions = {
//   type: 'postgres',
//   host: dbConfig.host,
//   port: dbConfig.port,
//   username: dbConfig.username,
//   password: dbConfig.password,
//   database: dbConfig.database,
//   migrationsTransactionMode: 'each',
//   entities: [path.join(__dirname, '/../**/*.entity{.ts,.js}')],
//   synchronize: dbConfig.synchronize,
//   migrations: [path.join(__dirname, '/../database/migrations/**/*{.ts,.js}')],
// //   cli: {
// //     migrationsDir: 'src/database/migrations',
// //   },
// };

// export = ormConfig;


// ormconfig.ts
// import { PostgresConnectionOptions } from 'typeorm';
import * as path from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const ormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'nestjs_db',
  synchronize: true,
  logging: true,
  entities: [path.join(__dirname, '/../**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '/../database/migrations/**/*{.ts,.js}')],
//   cli: {
//     migrationsDir: 'src/database/migrations',
//   },
};

export = ormConfig;
