import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { UserEntity } from "src/apis/users/users.entity";


export const UserDecorator = createParamDecorator((data, context: ExecutionContext): UserEntity => {
	const req = context.switchToHttp().getRequest();

	return req.user;
});