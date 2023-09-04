import { ConflictException, ForbiddenException, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { CardRepository } from './card.repository';
import { CardCrypt } from 'src/crypt/card.crypt';

@Injectable()
export class CardService {
  constructor(
    private readonly repository: CardRepository,
    private readonly cardCrypt: CardCrypt,
  ) {}

  // async create(createCardDto: CreateCardDto, userId: number) {
  //   const { title } = createCardDto;
  //   const card = await this.repository.findByTitleUserId(title, userId);
  //   const data: CreateCardDto = this.cardCrypt.cryptCard(createCardDto);

  //   if (card) {
  //     throw new ConflictException('Card title is already in collection!')
  //   }

  //   return this.repository.create(data, userId);
  // }

  async findAll(id: number) {
    const card = await this.repository.findAll(id);

    return card.map((c) => this.cardCrypt.descryptCard(c));
  }

  async findOne(id: number, userId: number) {
    const card = await this.repository.findOne(id);

    if (!card) {
      throw new NotFoundException('Card doesnt exists!');
    }

    if (card.userId !== userId) {
      throw new ForbiddenException(
        'Card doesnt exists in collection!',
      );
    }

    return this.cardCrypt.descryptCard(card);
  }

  async remove(id: number, userId: number) {
    await this.repository.findOne(id);

    return this.repository.remove(id, userId);
  }
}
