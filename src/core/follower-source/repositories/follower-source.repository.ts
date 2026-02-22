import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { FollowerSource } from '../entities';

@Injectable()
export class FollowerSourceRepository extends Repository<FollowerSource> {
  constructor(private dataSource: DataSource) {
    super(FollowerSource, dataSource.createEntityManager());
  }
}
