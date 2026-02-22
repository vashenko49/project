export interface ILeaderboardQuery {
  startDate: string;
  endDate: string;
  limit: number;
  onlyVerified?: boolean;
  excludeRestricted?: boolean;
}

export interface IConsistencyQuery {
  startDate: string;
  endDate: string;
}

export interface IProfileParam {
  profileId: string;
}

export interface ILeaderboardResponse {
  id: string;
  username: string;
  postsCount: number;
  totalComments: number;
  avgCommentsPerPost: number;
  followersCount: number | null;
  engagementPer1kFollowers: number;
}

export interface IBestTimeResponse {
  dayOfWeek: number;
  hourOfDay: number;
  sampleSize: number;
  avgComments: number;
}

export interface IConsistencyMetrics {
  totalPosts: number;
  activeDays: number;
  periodDays: number;
  activityRatio: number;
  avgGapHours: number;
  medianGapHours: number;
  gapStdDevHours: number;
  coefficientOfVariation: number;
}

export interface IConsistencyContext {
  profileId: string;
  startDate: string;
  endDate: string;
}

export interface IConsistencyResponse {
  metrics: IConsistencyMetrics;
  consistencyScore: number;
  context: IConsistencyContext;
}
