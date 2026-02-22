import { Module } from '@nestjs/common';
import { FollowerSourceRepository } from './repositories';
import { FollowerSourceService } from './services';

@Module({
  providers: [FollowerSourceRepository, FollowerSourceService],
  exports: [FollowerSourceService],
})
export class FollowerSourceModule {}
