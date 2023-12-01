import { IsOptional } from "class-validator";

export class PagenateAttendeeDTO {
	@IsOptional()
	page: number = 1;
}
