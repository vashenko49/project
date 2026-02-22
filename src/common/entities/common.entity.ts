import { PrimaryColumn } from 'typeorm';

import { BaseEntity } from './base.entity';

export class CommonEntity extends BaseEntity {
  @PrimaryColumn('varchar', {
    default: () => 'uuid_generate_v4()',
  })
  declare id: string;
}
