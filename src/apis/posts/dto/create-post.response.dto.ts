import { Exclude, Expose } from "class-transformer";

@Exclude()
export class CreatePostResponseDTO {
	@Expose()
	id: number;
}
