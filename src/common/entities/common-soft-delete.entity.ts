import { DeleteDateColumn } from 'typeorm';

import { CommonEntity } from './common.entity';
import { ISoftDeleteEntity } from '../interfaces';

export class CommonSoftDelete
  extends CommonEntity
  implements ISoftDeleteEntity<Date>
{
  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at' })
  deletedAt?: Date | null;
}
