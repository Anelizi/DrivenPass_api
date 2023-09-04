import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { NoteRepository } from './note.repository';

@Injectable()
export class NoteService {

  constructor(private readonly repository: NoteRepository){}

  async create(createNoteDto: CreateNoteDto, userId: number) {
    const { title } = createNoteDto;
    const note = await this.repository.findByTitleUserId(title, userId)

    if(note) throw new ConflictException('This title is already in collection');

    return this.repository.create(createNoteDto, userId);
  }

  async findAll(userId: number) {
    return this.repository.findAll(userId);
  }

  async findOne(id: number, userId: number) {
    const note = await this.repository.findOne(id);

    if(note.userId !== userId) throw new ForbiddenException(
      'Note not exists in collection!'
    )

    if(!note) throw new NotFoundException(
      'Note not exists!'
    )
    return note 
  }

  async remove(id: number, userId: number) {
    await this.repository.findOne(id);

    return this.repository.remove(id, userId);
  }
}
