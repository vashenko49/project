import { AbstractService } from '../../../common/services';
import { Account } from '../entities';
import { AccountRepository } from '../repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountService extends AbstractService<Account> {
  constructor(private readonly _AccountRepository: AccountRepository) {
    super(_AccountRepository);
  }
}
