import { Injectable } from '@nestjs/common';
import { Public } from './auth/decorators/public.decorator';

@Public()
@Injectable()
export class AppService {
  getHello(): string {
    return 'DevOps Bootcamp! Grupo-3!';
  }
}
