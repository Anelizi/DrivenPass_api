import { Global, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';

@Global()
@Module({
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule { }
