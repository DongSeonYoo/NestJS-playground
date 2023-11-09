import { UserModel } from "src/users/entities/User.entities";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PostsModel {
	@Column()
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => UserModel, (user) => user.posts, {
		nullable: false,
		eager: false
	})
	@JoinColumn({
		name: 'user_id',
	})
	author: UserModel;

	@Column()
	title: string;

	@Column()
	content: string;

	@Column({
		name: 'like_count',
		default: 0
	})
	likeCount: number;

	@Column({
		name: 'comment_count',
		default: 0
	})
	commentCount: number;
}