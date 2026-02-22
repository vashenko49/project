import { IsString, IsNotEmpty } from 'class-validator';
import { IProfileParam } from '../interfaces';

export class ProfileParamDto implements IProfileParam {
  @IsString()
  @IsNotEmpty()
  profileId: string;
}
