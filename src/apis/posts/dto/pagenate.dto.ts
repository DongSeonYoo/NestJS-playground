import { IsNumber, IsNumberString, IsOptional } from "class-validator";

export class PagenateRequestDTO {
	@IsOptional()
	page: number = 1;
}