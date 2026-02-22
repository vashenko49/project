import { Module } from '@nestjs/common';
import { AccountRepository } from './repositories';
import { AccountService } from './services';

@Module({
  providers: [AccountRepository, AccountService],
  exports: [AccountService],
})
export class AccountModule {}
