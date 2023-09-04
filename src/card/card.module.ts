import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { CardRepository } from './card.repository';
import { CardCrypt } from 'src/crypt/card.crypt';

@Module({
  controllers: [CardController],
  providers: [CardService, CardRepository, CardCrypt],
})
export class CardModule {}
