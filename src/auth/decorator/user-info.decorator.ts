import { ExecutionContext, createParamDecorator } from "@nestjs/common";


export const UserDecorator = createParamDecorator((data, context: ExecutionContext) => {
	const req = context.switchToHttp().getRequest();

	return req.user;
});