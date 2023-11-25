import { IsNumber, IsNumberString, IsOptional } from "class-validator";

export class PagenateRequestDTO {
	@IsOptional()
	@IsNumberString()
	page?: number = 1;
}