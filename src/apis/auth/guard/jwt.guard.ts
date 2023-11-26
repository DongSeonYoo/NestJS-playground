import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { TokenExpiredError } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { }
