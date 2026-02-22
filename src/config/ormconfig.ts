import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import migrations from '../migrations';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Account } from '../core/account/entities';
import { FollowerSource } from '../core/follower-source/entities';
import { Post } from '../core/post/entities';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Account, FollowerSource, Post],
  migrations,
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
