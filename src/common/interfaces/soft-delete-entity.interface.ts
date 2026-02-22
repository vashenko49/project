import { IBaseEntity } from './base-entity.interface';

export interface ISoftDeleteEntity<D = string> extends IBaseEntity<D> {
  deletedAt?: D | null;
}
