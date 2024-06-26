import { JwtModule, JwtService } from '@nestjs/jwt';

import { Module } from '@nestjs/common';
import { JwtAuthService } from './jwt.service';

@Module({
  imports: [
    JwtModule.register({
      secret: '123',
      signOptions: { expiresIn: '30m' },
    }),
  ],
  providers: [JwtAuthService],
  exports: [JwtModule, JwtAuthService],
})
export class JwtAuthModule {}