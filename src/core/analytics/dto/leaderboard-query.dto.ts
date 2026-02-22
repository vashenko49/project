import {
  IsBoolean,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ILeaderboardQuery } from '../interfaces';
import { ToBoolean } from '../../../common/transformers';

export class LeaderboardQueryDto implements ILeaderboardQuery {
  @IsISO8601()
  @IsString()
  @IsNotEmpty()
  startDate: string;

  @IsISO8601()
  @IsString()
  @IsNotEmpty()
  endDate: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number;

  @IsOptional()
  @ToBoolean()
  @IsBoolean()
  onlyVerified?: boolean;

  @IsOptional()
  @ToBoolean()
  @IsBoolean()
  excludeRestricted?: boolean;
}
