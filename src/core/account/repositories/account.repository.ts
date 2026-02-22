import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Account } from '../entities';

@Injectable()
export class AccountRepository extends Repository<Account> {
  constructor(private dataSource: DataSource) {
    super(Account, dataSource.createEntityManager());
  }
}
