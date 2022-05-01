import { Module } from '@nestjs/common';
import { AppController } from "../app.controller";
import PostsController from "./posts.controller";
import { AppService } from "../app.service";
import PostsService from "./posts.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./post.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [AppController, PostsController],
  providers: [AppService, PostsService]
})
export class PostsModule {}
