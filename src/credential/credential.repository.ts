import { Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CredentialRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(createCredentialDto: CreateCredentialDto, userId: number) {
    return this.prisma.credential.create({
      data: {
        ...createCredentialDto,
        userId,
      },
      select: {
        id: true,
        title: true,
        url: true,
        password: true,
        userId: true,
      },
    });
  }

  findOneByUserId(title: string, userId: number){
    return this.prisma.credential.findUnique({
      where: {
        title_userId: {title, userId}
      }
    })
  }

  findAll(userId: number) {
    return this.prisma.credential.findMany({
      where: { userId },
    });
  }

  findOne(id: number) {
    return this.prisma.credential.findUnique({
      where: { id },
    });
  }

  remove(id: number, userId: number) {
    return this.prisma.credential.delete({ where: { id, userId } });
  }
}
