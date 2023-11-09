import { BaseEntity } from "src/common/BaseEntity";
import { ROLE } from "src/common/Role.enum";
import { PostsModel } from "src/posts/entities/Post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

/**
 * id: number
 * 
 * nickname: string
 * 
 * email: string
 * 
 * password: string
 * 
 * role: [RolesEnum.USER, RolesEnum.ADMIN]
 */
@Entity()
export class UserModel extends BaseEntity {
	@Column({
		length: 20,
		unique: true
	})
	// 1. 길이가 20을 넘지 않을 것
	// 2. 유일무이한 값이 될 것
	nickname: string;

	@Column({
		unique: true
	})
	// 1. 유일무이한 값이 될 것
	email: string;

	@Column()
	password: string;

	@OneToMany(() => PostsModel, (post) => post.author)
	posts: PostsModel[];

	@Column({
		enum: Object.values(ROLE),
		default: ROLE.USER
	})
	role: ROLE;
}