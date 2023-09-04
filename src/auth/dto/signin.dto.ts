import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: "ane@gmail.com",
    description: "email for user"
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: "S3nh@fort3!",
    description: "passaword for user"
  })
  password: string;
}
