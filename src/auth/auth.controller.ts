import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //cadastro
  @Post('/sign-up')
  @ApiOperation({summary: "Register a user."})
  @ApiBody({type: SignUpDto})
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  //login
  @Post('/sign-in')
  @ApiOperation({summary: "Authenticate a user."})
  @ApiBody({type: SignInDto})
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
