import { IsIn, IsNumber, IsOptional } from "class-validator";

export class CursorPagenameRequestDTO {
	@IsOptional()
	@IsNumber()
	where__id_more_than?: number = 1;

	@IsOptional()
	@IsIn(['ASC', 'DESC'])
	order_createdAt?: 'ASC' = 'ASC';

	// offset
	@IsNumber()
	@IsOptional()
	take: number = 20;
}