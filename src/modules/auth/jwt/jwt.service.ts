import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DecodedToken } from './dto/jwt-auth.dto';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async signPayload(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }

  async validateToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token) as DecodedToken;
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}