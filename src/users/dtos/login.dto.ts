import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export default class CreateUserDto {
  @IsNotEmpty({ message: 'Todos os campos são necessários!' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: 'Todos os campos são necessários!' })
  @IsString()
  @IsEmail()
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
  password: string;
}
