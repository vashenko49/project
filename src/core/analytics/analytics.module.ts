import { Module } from '@nestjs/common';
import { AccountModule } from '../account/account.module';
import { FollowerSourceModule } from '../follower-source/follower-source.module';
import { PostModule } from '../post/post.module';
import { AnalyticsController } from './controllers';
import { AnalyticsService } from './services';

@Module({
  controllers: [AnalyticsController],

  imports: [AccountModule, FollowerSourceModule, PostModule],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
