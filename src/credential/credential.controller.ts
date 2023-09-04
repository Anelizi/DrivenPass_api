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
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('credentials')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('credentials')
export class CredentialController {
  constructor(private readonly credentialService: CredentialService) {}

  @Post()
  @ApiBody({type: CreateCredentialDto})
  create(
    @Body() createCredentialDto: CreateCredentialDto,
    @User() user: UserPrisma,
  ) {
    const { id } = user;
    return this.credentialService.create(createCredentialDto, id);
  }

  @Get()
  findAll(@User() user: UserPrisma) {
    const { id } = user;
    return this.credentialService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: UserPrisma) {
    const { id: userId } = user;
    return this.credentialService.findOne(+id, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserPrisma) {
    const { id: userId } = user;
    return this.credentialService.remove(+id, userId);
  }
}
