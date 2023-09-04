import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CardRepository {
  constructor(private readonly prisma: PrismaService) {}

  // create(createCardDto: CreateCardDto, userId: number) {
  //   const typeCard = createCardDto.type;
  //   const typeCardIds = typeCard.map((id) => ({ id, }));

  //   const createdCard = this.prisma.card.create({
  //     data: {
  //       ...createCardDto,
  //       userId,
  //       typeCard: {
  //         connect: typeCardIds
  //       },
  //     },
  //     select: {
  //       id: true,
  //       title: true,
  //       number: true,
  //       owner: true,
  //       cvv: true,
  //       expiration: true,
  //       password: true,
  //       userId: true,
  //       typeCard: {
  //         select: {
  //           type: true,
  //         },
  //       },
  //     },
  //   });
  //   return createdCard;
  // }

  findByTitleUserId(title: string, userId: number) {
    return this.prisma.card.findUnique({
      where: {
        title_userId: { title, userId },
      },
    });
  }

  findAll(userId: number) {
    return this.prisma.card.findMany({
      where: { userId },
      include: {
        typeCard: {
          select: { type: true },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.card.findUnique({
      where: { id },
      include: {
        typeCard: {
          select: { type: true },
        },
      },
    });
  }

  remove(id: number, userId: number) {
    return this.prisma.card.delete({ where: { id, userId } });
  }
}
