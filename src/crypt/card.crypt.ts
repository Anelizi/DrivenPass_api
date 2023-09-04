import { Injectable } from '@nestjs/common';
import { Card } from '@prisma/client';
import { CreateCardDto } from 'src/card/dto/create-card.dto';

@Injectable()
export class CardCrypt {
  private Cryptr = require('cryptr');
  private cryptr: any;

  constructor() {
    this.cryptr = new this.Cryptr(process.env.CRYPTR);
  }

  cryptCard(
    createCardDtoDto: CreateCardDto,
  ): CreateCardDto {
    return {
      ...createCardDtoDto,
      password: this.cryptr.encrypt(createCardDtoDto.password),
      cvv: this.cryptr.encrypt(createCardDtoDto.cvv)
    };
  }

  descryptCard(card: Card): Card {
    return {
      ...card,
      password: this.cryptr.decrypt(card.password),
      cvv: this.cryptr.decrypt(card.cvv)
    };
  }
}
