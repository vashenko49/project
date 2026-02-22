import { FindOptionsWhere, Repository } from 'typeorm';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { ObjectId } from 'typeorm/driver/mongodb/typings';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { SaveOptions } from 'typeorm/repository/SaveOptions';

import { BaseEntity } from '../entities';
import { QueryRunner } from 'typeorm/query-runner/QueryRunner';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';

export class AbstractService<T extends BaseEntity> {
  constructor(private readonly repository: Repository<T>) {}

  createQueryBuilder(alias?: string, queryRunner?: QueryRunner): SelectQueryBuilder<T> {
    return this.repository.createQueryBuilder(alias, queryRunner);
  }

  async count(options?: FindManyOptions<T>): Promise<number> {
    return this.repository.count(options);
  }

  async nativeDelete(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectId
      | ObjectId[]
      | FindOptionsWhere<T>,
  ): Promise<DeleteResult> {
    return this.repository.delete(criteria);
  }

  async nativeUpdate(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectId
      | ObjectId[]
      | FindOptionsWhere<T>,
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult> {
    return this.repository.update(criteria, partialEntity);
  }

  async find(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  async findOne(options: FindOneOptions<T>): Promise<T | null> {
    return this.repository.findOne(options);
  }

  async exists(where: FindOptionsWhere<T>): Promise<boolean> {
    return this.repository.exists({ where });
  }

  async save(entity: DeepPartial<T>, options?: SaveOptions): Promise<T> {
    return this.repository.save(entity, options);
  }

  async saveAll(entity: DeepPartial<T>[], options?: SaveOptions): Promise<T[]> {
    return this.repository.save(entity, options);
  }
}
