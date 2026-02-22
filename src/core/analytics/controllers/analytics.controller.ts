import { Controller, Get, Query, Param } from '@nestjs/common';
import { AnalyticsService } from '../services';
import { ConsistencyQueryDto, LeaderboardQueryDto, ProfileParamDto } from '../dto';
import { IBestTimeResponse, IConsistencyResponse, ILeaderboardResponse } from '../interfaces';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly _AnalyticsService: AnalyticsService) {}

  @Get('leaderboard')
  async getLeaderboard(@Query() query: LeaderboardQueryDto): Promise<ILeaderboardResponse[]> {
    return this._AnalyticsService.getLeaderboard(
      query.startDate,
      query.endDate,
      query.limit,
      query.onlyVerified,
      query.excludeRestricted,
    );
  }

  @Get('best-time/:profileId')
  async getBestPostingTime(@Param() params: ProfileParamDto): Promise<IBestTimeResponse[]> {
    return this._AnalyticsService.getBestPostingTime(params.profileId);
  }

  @Get('consistency/:profileId')
  async getConsistencyScore(
    @Param() params: ProfileParamDto,
    @Query() query: ConsistencyQueryDto,
  ): Promise<IConsistencyResponse> {
    return this._AnalyticsService.getConsistencyScore(
      params.profileId,
      query.startDate,
      query.endDate,
    );
  }
}
