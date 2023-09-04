import { Module } from '@nestjs/common';
import { CredentialService } from './credential.service';
import { CredentialController } from './credential.controller';
import { CredentialRepository } from './credential.repository';
import { CredentialCrypt } from 'src/crypt/credential.crypt';

@Module({
  controllers: [CredentialController],
  providers: [CredentialService, CredentialRepository, CredentialCrypt],
})
export class CredentialModule {}
