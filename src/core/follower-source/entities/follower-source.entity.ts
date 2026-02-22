import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { CommonEntity } from '../../../common/entities';
import { IFollowerSource } from '../interfaces';
import { Account } from '../../account/entities';

@Entity({
  name: 'follower_sources',
})
@Index('IDX__id', ['_id'])
export class FollowerSource extends CommonEntity implements IFollowerSource {
  @Column({ type: 'int', name: '_id', unique: true })
  _id: number;

  @ManyToOne(() => Account, (account) => account.followerSources)
  @JoinColumn({ name: '_id', referencedColumnName: '_id' })
  account: Account;

  @Column({ type: 'int' })
  followersCount: number;
}
