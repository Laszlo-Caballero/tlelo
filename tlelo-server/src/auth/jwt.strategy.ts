import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: {
    id: number;
    name: string;
    type: string;
    iat: number;
  }) {
    if (payload.type != 'admin') {
      throw new HttpException('No autorizado', HttpStatus.UNAUTHORIZED);
    }

    return payload;
  }
}
