import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { UserEntity } from "../users/users.entity";

@Entity({
	name: 'post_tb'
})
export class PostsEntity extends BaseEntity {
	@Column({
		nullable: false
	})
	title: string;

	@Column({
		nullable: false
	})
	content: string;

	@ManyToOne(() => UserEntity, (user) => user.posts, {
		nullable: false
	})
	@JoinColumn({
		name: 'user_id'
	})
	author: UserEntity;
}