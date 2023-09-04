import { Injectable } from '@nestjs/common';
import { Credential } from '@prisma/client';
import { CreateCredentialDto } from 'src/credential/dto/create-credential.dto';

@Injectable()
export class CredentialCrypt {
  private Cryptr = require('cryptr');
  private cryptr: any;

  constructor() {
    this.cryptr = new this.Cryptr(process.env.CRYPTR);
  }

  cryptCredential(
    createCredentialDto: CreateCredentialDto,
  ): CreateCredentialDto {
    return {
      ...createCredentialDto,
      password: this.cryptr.encrypt(createCredentialDto.password),
    };
  }

  descryptCredential(credential: Credential): Credential {
    return {
      ...credential,
      password: this.cryptr.decrypt(credential.password),
    };
  }
}
