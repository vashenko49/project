import { AbstractService } from '../../../common/services';
import { Post } from '../entities';
import { PostRepository } from '../repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService extends AbstractService<Post> {
  constructor(private readonly _PostRepository: PostRepository) {
    super(_PostRepository);
  }
}
