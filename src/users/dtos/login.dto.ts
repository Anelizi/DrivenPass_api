import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export default class CreateUserDto {
  @IsNotEmpty({ message: 'Todos os campos são necessários!' })
  @IsString()
  @ApiProperty({
    example: "ane",
    description: "username for user"
  })
  username: string;

  @IsNotEmpty({ message: 'Todos os campos são necessários!' })
  @IsString()
  @IsEmail()
  @ApiProperty({
    example: "ane@gmail.com",
    description: "email for user"
  })
  email: string;

  @IsNotEmpty({ message: 'Todos os campos são necessários!' })
  @IsString()
  @MinLength(10, { message: 'A senha deve ter pelo menos 10 caracteres.' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    {
      message:
        'A senha deve conter pelo menos 1 letra minúscula, 1 letra maiúscula, 1 número e 1 caractere especial.',
    },
  )
  @ApiProperty({
    example: "S3nh@fort3!",
    description: "password for user"
  })
  password: string;
}
