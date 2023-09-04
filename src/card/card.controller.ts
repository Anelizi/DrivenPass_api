import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('cards')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  // @Post()
  // create(@Body() createCardDto: CreateCardDto, @User() user: UserPrisma) {
  //   const { id } = user;
  //   return this.cardService.create(createCardDto, id);
  // }

  @Get()
  findAll(@User() user: UserPrisma) {
    const { id } = user;
    return this.cardService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: UserPrisma) {
    const { id: userId } = user;
    return this.cardService.findOne(+id, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserPrisma) {
    const { id: userId } = user;
    return this.cardService.remove(+id, userId);
  }
}
