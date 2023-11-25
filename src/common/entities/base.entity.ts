import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@CreateDateColumn({
		name: 'created_at'
	})
	createdAt: Date;

	@Column()
	@UpdateDateColumn({
		name: 'updated_at'
	})
	updatedAt: Date;
}