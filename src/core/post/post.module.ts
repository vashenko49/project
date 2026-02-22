import { Module } from '@nestjs/common';
import { PostRepository } from './repositories';
import { PostService } from './services';

@Module({
  providers: [PostRepository, PostService],
  exports: [PostService],
})
export class PostModule {}
