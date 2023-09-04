import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: number, userId: number) {
    const credential = await this.repository.findOne(id);

    if(!credential) throw new NotFoundException('Credential not exists')

    if(credential.userId !== userId){
      throw new ForbiddenException('Credential not exist in Collection')
    }

    return this.credential.descryptCredential(credential);
  }

  async remove(id: number, userId: number) {
    await this.findOne(id, userId);
    
    return this.repository.remove(id, userId);
  }
}
