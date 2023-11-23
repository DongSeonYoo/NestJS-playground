import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
	name: 'user_tb'
})
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		unique: true
	})
	email: string;

	@Column()
	name: string;

	@Column()
	password: string;
}
