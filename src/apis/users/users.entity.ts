import { Exclude, Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { BaseEntity } from "../../common/entities/base.entity";
import { PostsEntity } from "../posts/posts.entity";

@Entity({
	name: 'user_tb'
})
export class UserEntity extends BaseEntity {
	@Column({
		unique: true,
		nullable: false
	})
	email: string;

	@Column({
		nullable: false
	})
	name: string;

	@Column({
		nullable: false
	})

	@Exclude({
		toPlainOnly: true
	})
	password: string;

	@OneToMany(() => PostsEntity, (posts) => posts.author)
	posts: PostsEntity;
}
