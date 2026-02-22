import { Injectable } from '@nestjs/common';
import { AccountService } from '../../account/services';
import { PostService } from '../../post/services';
import { IBestTimeResponse, IConsistencyResponse, ILeaderboardResponse } from '../interfaces';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly accountService: AccountService,
    private readonly postService: PostService,
  ) {}

  async getLeaderboard(
    startDateIso: string,
    endDateIso: string,
    limit: number,
    onlyVerified?: boolean,
    excludeRestricted?: boolean,
  ): Promise<ILeaderboardResponse[]> {
    const startDate = new Date(startDateIso);
    const endDate = new Date(endDateIso);

    const qb = this.accountService.createQueryBuilder('a');

    if (onlyVerified) qb.andWhere('a.isVerified = true');
    if (excludeRestricted) qb.andWhere('a.restricted IS NULL');

    qb.innerJoin(
      (sub) =>
        sub
          .select('p.profile_id', 'profileId')
          .addSelect('COUNT(p.id)', 'postsCount')
          .addSelect('SUM(p.commentsCount)', 'totalComments')
          .addSelect('AVG(p.commentsCount)', 'avgCommentsPerPost')
          .from('posts', 'p')
          .where('p.createdTime BETWEEN :startDate AND :endDate')
          .groupBy('p.profile_id'),
      'stats',
      'stats."profileId" = a.id',
    );

    qb.leftJoin('a.followerSources', 'f')
      .select([
        'a.id AS id',
        'a.username AS username',
        'stats."postsCount"::int AS "postsCount"',
        'stats."totalComments"::int AS "totalComments"',
        'stats."avgCommentsPerPost"::float AS "avgCommentsPerPost"',
        'MAX(f.followersCount) AS "followersCount"',
      ])
      .addSelect(
        `CASE 
          WHEN MAX(f.followersCount) > 0 THEN (stats."totalComments"::float * 1000) / MAX(f.followersCount)
          ELSE 0 
        END`,
        'engagementPer1kFollowers',
      )
      .setParameters({ startDate, endDate })
      .groupBy(
        'a.id, a.username, stats."postsCount", stats."totalComments", stats."avgCommentsPerPost"',
      )
      .orderBy('"engagementPer1kFollowers"', 'DESC')
      .limit(limit);

    return qb.getRawMany();
  }

  async getBestPostingTime(
    profileId: string,
    startDateIso?: string,
    endDateIso?: string,
  ): Promise<IBestTimeResponse[]> {
    const qb = this.postService
      .createQueryBuilder('p')
      .select([
        'EXTRACT(ISODOW FROM p.createdTime)::int AS "dayOfWeek"',
        'EXTRACT(HOUR FROM p.createdTime)::int AS "hourOfDay"',
        'COUNT(p.id)::int AS "sampleSize"',
        'AVG(p.commentsCount)::float AS "avgComments"',
      ])
      .where('p.profileId = :profileId', { profileId });

    if (startDateIso && endDateIso) {
      qb.andWhere('p.createdTime BETWEEN :start AND :end', {
        start: new Date(startDateIso),
        end: new Date(endDateIso),
      });
    }

    qb.groupBy('"dayOfWeek", "hourOfDay"')
      .having('COUNT(p.id) > 0')
      .orderBy('"avgComments"', 'DESC')
      .addOrderBy('"sampleSize"', 'DESC');

    return qb.getRawMany();
  }

  async getConsistencyScore(
    profileId: string,
    startDateIso: string,
    endDateIso: string,
  ): Promise<IConsistencyResponse> {
    const startDate = new Date(startDateIso);
    const endDate = new Date(endDateIso);

    const periodDays = Math.max(
      1,
      Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)),
    );

    const innerQuery = this.postService
      .createQueryBuilder('p')
      .select('p.createdTime', 'curr')
      .addSelect('LAG(p.createdTime) OVER (ORDER BY p.createdTime)', 'prev')
      .where('p.profileId = :profileId', { profileId })
      .andWhere('p.createdTime BETWEEN :startDate AND :endDate', { startDate, endDate });

    const stats = await this.postService
      .createQueryBuilder()
      .from(`(${innerQuery.getQuery()})`, 'g')
      .setParameters(innerQuery.getParameters())
      .select([
        'COUNT(*)::int AS "totalPosts"',
        'COUNT(DISTINCT DATE(g.curr))::int AS "activeDays"',
        'AVG(EXTRACT(EPOCH FROM (g.curr - g.prev)) / 3600)::float AS "avgGap"',
        'STDDEV(EXTRACT(EPOCH FROM (g.curr - g.prev)) / 3600)::float AS "stddevGap"',
        'PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (g.curr - g.prev)) / 3600)::float AS "medianGap"',
      ])
      .getRawOne();

    const totalPosts = stats?.totalPosts || 0;
    const activeDays = stats?.activeDays || 0;
    const avgGap = stats?.avgGap || 0;
    const stddevGap = stats?.stddevGap || 0;
    const activityRatio = activeDays / periodDays;
    const cv = avgGap > 0 ? stddevGap / avgGap : 0;
    const stability = 1 / (1 + cv);
    const score = totalPosts > 1 ? activityRatio * stability * 100 : 0;

    return {
      metrics: {
        totalPosts,
        activeDays,
        periodDays,
        activityRatio,
        avgGapHours: avgGap,
        medianGapHours: stats?.medianGap || 0,
        gapStdDevHours: stddevGap,
        coefficientOfVariation: cv,
      },
      consistencyScore: Math.round(score * 100) / 100,
      context: {
        profileId,
        startDate: startDateIso,
        endDate: endDateIso,
      },
    };
  }
}
