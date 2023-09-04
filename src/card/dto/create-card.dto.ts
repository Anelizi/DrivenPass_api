import {
  IsNotEmpty,
  IsNumberString,
  IsString,
} from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumberString()
  number: string;

  @IsNotEmpty()
  @IsString()
  owner: string;

  @IsNotEmpty()
  @IsNumberString()
  cvv: string;

  @IsNotEmpty()
  @IsString()
  expiration: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  type: number[];
}
