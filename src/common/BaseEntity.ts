import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn({
		type: 'timestamp with time zone',
		name: 'created_at'
	})
	createdAt: Date;

	@UpdateDateColumn({
		type: 'timestamp with time zone',
		name: 'updated_at'
	})
	updatedAt: Date;
}