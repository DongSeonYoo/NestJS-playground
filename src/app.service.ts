import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService
  ) {
  }
  getHello(): string {
    const testMessage: string = process.env.MESSAGE;

    return testMessage;
  }

  testFromConfigService() {
    return this.configService.get('CONFIG_SERVICE_TEST');
  }
}
