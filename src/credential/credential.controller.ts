import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CredentialService } from './credential.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';

@UseGuards(AuthGuard)
@Controller('credentials')
export class CredentialController {
  constructor(private readonly credentialService: CredentialService) {}

  @Post()
  create(
    @Body() createCredentialDto: CreateCredentialDto,
    @User() user: UserPrisma,
  ) {
    const { id } = user;
    return this.credentialService.create(createCredentialDto, id);
  }

  @Get()
  findAll(@User() user: UserPrisma) {
    const { id } = user
    return this.credentialService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.credentialService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.credentialService.remove(+id);
  }
}
