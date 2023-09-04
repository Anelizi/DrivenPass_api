import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { User } from 'src/decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('notes')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @ApiBody({type: CreateNoteDto})
  create(@Body() createNoteDto: CreateNoteDto, @User() user: UserPrisma) {
    const { id } = user;
    return this.noteService.create(createNoteDto, id);
  }

  @Get()
  findAll(@User() user: UserPrisma) {
    const { id } = user;
    return this.noteService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: UserPrisma) {
    const { id: userId } = user;
    return this.noteService.findOne(+id, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserPrisma) {
    const { id: userId } = user;
    return this.noteService.remove(+id, userId);
  }
}
