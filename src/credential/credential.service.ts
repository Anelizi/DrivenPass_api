import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { CredentialRepository } from './credential.repository';
import { CredentialCrypt } from 'src/crypt/credential.crypt';

@Injectable()
export class CredentialService {
  constructor(
    private readonly repository: CredentialRepository,
    private readonly credential: CredentialCrypt,
  ) {}

  async create(createCredentialDto: CreateCredentialDto, userId: number) {
    const { title } = createCredentialDto;
    const credential = await this.repository.findOneByUserId(
      title,
      userId,
    );
    const data: CreateCredentialDto =
      this.credential.cryptCredential(createCredentialDto);

    if (credential)
      throw new ConflictException('This credential title is already in use');

    return this.repository.create(data, userId);
  }

  async findAll(id: number) {
    const credential = await this.repository.findAll(id);

    return credential.map((c) => this.credential.descryptCredential(c));
  }

  async findOne(id: number) {
    return `This action returns a #${id} credential`;
  }

  async remove(id: number) {
    return `This action removes a #${id} credential`;
  }
}
