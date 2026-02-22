import { AbstractService } from '../../../common/services';
import { FollowerSource } from '../entities';
import { FollowerSourceRepository } from '../repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FollowerSourceService extends AbstractService<FollowerSource> {
  constructor(private readonly _FollowerSourceRepository: FollowerSourceRepository) {
    super(_FollowerSourceRepository);
  }
}
