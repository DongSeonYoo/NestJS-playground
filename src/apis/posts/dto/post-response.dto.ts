import { PostsEntity } from "../posts.entity";

export class PostResponseDTO {
	posts: PostsEntity[];
	count: number
}
