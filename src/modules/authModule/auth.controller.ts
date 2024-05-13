import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthSignin } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(@Body() createAuthDto: CreateAuthDto, @Headers('authorization') token:string) {
    return this.authService.create(createAuthDto, token);
  }

  @Post('sign')
  async signIn(@Body() authSignIn: AuthSignin) {
    return this.authService.signIn(authSignIn);
  }

  
}
