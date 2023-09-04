import { ConflictException, Injectable } from '@nestjs/common';
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

  async findOne(id: number) {
    return `This action returns a #${id} note`;
  }

  async remove(id: number) {
    return `This action removes a #${id} note`;
  }
}
