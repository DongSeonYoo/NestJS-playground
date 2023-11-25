import { IsNumber, IsOptional } from "class-validator";

export class PagenateRequestDTO {
	@IsOptional()
	@IsNumber()
	page?: number = 1;
}