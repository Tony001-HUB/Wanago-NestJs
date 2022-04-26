import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts/posts.service';

@Module({
  imports: [],
  controllers: [AppController, PostsController],
  providers: [AppService, PostsService],
})
export class AppModule {}
