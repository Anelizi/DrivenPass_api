import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private EXPIRATION_TIME = '7 days';
  private ISSURE = 'Driven';
  private AUDIENCE = 'users';

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    return await this.userService.create(signUpDto);
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.userService.getUserByUseremail(email);
    if (!user) throw new UnauthorizedException('Email ou senha inválidos.');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Email ou senha inválidos.');

    return this.createToken(user);
  }

  createToken(user: User) {
    const { id, username } = user;
    const token = this.jwtService.sign(
      { username, id },
      {
        expiresIn: this.EXPIRATION_TIME, //Por qunto tempo o token é válido
        subject: String(id), //de quem é o token
        issuer: this.ISSURE, //quem tá emitindo o token sistema driven
        audience: this.AUDIENCE, //para qual serviço esse token está sendo gerado 
      },
    );
    return { token };
  }

  checkToken(token: string) {
    const data = this.jwtService.verify(token, {
      audience: this.AUDIENCE,
      issuer: this.ISSURE
    })
    return data;
  }
}
