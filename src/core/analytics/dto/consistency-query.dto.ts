import { IsISO8601, IsNotEmpty, IsString } from 'class-validator';
import { IConsistencyQuery } from '../interfaces';

export class ConsistencyQueryDto implements IConsistencyQuery {
  @IsISO8601()
  @IsString()
  @IsNotEmpty()
  startDate: string;

  @IsISO8601()
  @IsString()
  @IsNotEmpty()
  endDate: string;
}
