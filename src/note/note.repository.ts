import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NoteRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(createNoteDto: CreateNoteDto, userId: number) {
    return this.prisma.note.create({
      data: {
        ...createNoteDto,
        userId,
      },
      select: {
        id: true,
        title: true,
        text: true,
      },
    });
  }

  findByTitleUserId(title: string, userId: number) {
    return this.prisma.note.findUnique({
      where: {
        title_userId: { title, userId },
      },
    });
  }

  findAll(userId: number) {
    return this.prisma.note.findMany({
      where: {
        userId,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.note.findUnique({
      where: {
        id,
      },
    });
  }

  remove(id: number, userId: number) {
    return this.prisma.note.delete({
      where: {
        id,
        userId,
      },
    });
  }
}
