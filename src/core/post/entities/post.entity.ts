import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { IPost } from '../interfaces';
import { CommonEntity } from '../../../common/entities';
import { Account } from '../../account/entities';

@Entity({
  name: 'posts',
})
@Index('IDX_post_prf_id_crd_time', ['profileId', 'createdTime'])
@Index('IDX_post_crd_time', ['createdTime'])
export class Post extends CommonEntity implements IPost<Date> {
  @Column({ type: 'timestamp' })
  createdTime: Date;

  @ManyToOne(() => Account, (profile) => profile.posts, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'profile_id' })
  profile: Account;

  @Column({
    name: 'profile_id',
  })
  profileId: string;

  @Column({ type: 'text' })
  textOriginal: string;

  @Column({ type: 'int', default: 0 })
  commentsCount: number;
}
