import { Column, Entity, Index, OneToMany } from 'typeorm';
import { CommonEntity } from '../../../common/entities';
import { IAccount } from '../interfaces';
import { Post } from '../../post/entities';
import { FollowerSource } from '../../follower-source/entities';

@Entity({
  name: 'accounts',
})
@Index('IDX_account__id', ['_id'])
@Index('idx_account_is_verified', ['isVerified'])
@Index('IDX_account_restricted', ['restricted'])
export class Account extends CommonEntity implements IAccount {
  @Column({ nullable: true })
  username: string;

  @Column()
  fullName: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  isVerified: boolean;

  @Column({ nullable: true })
  restricted: string;

  @Column({ type: 'int', unique: true })
  _id: number;

  @Column({ nullable: true })
  _status: string;

  @Column({ nullable: true })
  idAlt: string;

  @OneToMany(() => Post, (posts) => posts.profile)
  posts: Post[];

  @OneToMany(() => FollowerSource, (source) => source.account)
  followerSources: FollowerSource[];
}
