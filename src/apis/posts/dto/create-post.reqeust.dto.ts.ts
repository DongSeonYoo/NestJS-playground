import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreatePostRequestDTO {
	@IsNotEmpty()
	@IsString()
	@Length(1, 20)
	title: string;

	@IsNotEmpty()
	@IsString()
	content: string;
}