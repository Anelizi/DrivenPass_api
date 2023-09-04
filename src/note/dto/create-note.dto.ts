import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: "mate",
    description: "title for user"
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: "iih não fui bem não",
    description: "text for user"
  })
  text: string;
}
