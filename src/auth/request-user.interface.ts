import { Request } from "express";
import { UserEntity } from "src/users/users.entity";

export interface RequestWithUser extends Request {
	user: UserEntity;
}
