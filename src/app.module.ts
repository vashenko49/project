import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './config/ormconfig';
import { addTransactionalDataSource, getDataSourceByName } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { AnalyticsModule } from './core/analytics/analytics.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return dataSourceOptions;
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return (
          getDataSourceByName('default') || addTransactionalDataSource(new DataSource(options))
        );
      },
    }),

    AnalyticsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
