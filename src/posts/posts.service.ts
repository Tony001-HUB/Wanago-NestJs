import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdatePostDto } from "./dto/updatePost.dto";
import { CreatePostDto } from "./dto/createPost.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Post from './post.entity';


export interface IPost {
  id: number;
  content: string;
  title: string;
}

@Injectable()
export default class PostsService {

  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>
  ) {}

  private lastPostId = 0;
  private posts: IPost[] = [];

  getAllPosts() {
    return this.postsRepository.find();
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({ where: {id: id} });
    if (post) {
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async createPost(post: CreatePostDto) {
    const newPost = await this.postsRepository.create(post);
    await this.postsRepository.save(newPost);
    return newPost;
  }

  async updatePost(id: number, post: UpdatePostDto) {
    await this.postsRepository.update(id, post);
    const updatedPost = await this.postsRepository.findOne({ where: {id: id} });
    if (updatedPost) {
      return updatedPost
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async deletePost(id: number) {
    const deleteResponse = await this.postsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
