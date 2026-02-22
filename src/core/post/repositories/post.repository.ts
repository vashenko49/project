import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Post } from '../entities';

@Injectable()
export class PostRepository extends Repository<Post> {
  constructor(private dataSource: DataSource) {
    super(Post, dataSource.createEntityManager());
  }
}
