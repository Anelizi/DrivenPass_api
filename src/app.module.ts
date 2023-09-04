import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CredentialModule } from './credential/credential.module';
import { NoteModule } from './note/note.module';
import { CardModule } from './card/card.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, CredentialModule, NoteModule, CardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
