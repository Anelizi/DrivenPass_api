import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateCredentialDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: "face",
        description: "title for user"
      })
    title: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: "ane",
        description: "username for user"
      })
    username: string;

    @IsNotEmpty()
    @IsString()
    @IsUrl()
    @ApiProperty({
        example: "https://face.com",
        description: "url for user"
      })
    url: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: "XXAs@123",
        description: "password for user"
      })
    password: string;
}
