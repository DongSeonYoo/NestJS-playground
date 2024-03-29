import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

export class PasswordPipe implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata) {
		if (value.length > 8) throw new BadRequestException('비밀번호는 8자 이하로');

		return value.toString();
	}
}

@Injectable()
export class MaxLengthPipe implements PipeTransform {
	constructor(private readonly length: number) { }

	transform(value: any, metadata: ArgumentMetadata): string {
		if (value.length > this.length) {
			throw new BadRequestException(`최대 길이는 ${this.length} 입니다`);
		}

		return value.toString();
	}
}

@Injectable()
export class MinLengthPipe implements PipeTransform {
	constructor(private readonly length: number) { }

	transform(value: any, metadata: ArgumentMetadata): string {
		if (value.toString().length < this.length) {
			throw new BadRequestException(`최소 길이는 ${this.length} 입니다`);
		}

		return value.toString();
	}
}