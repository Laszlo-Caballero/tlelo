import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { UserJwt } from 'src/types/types';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: UserJwt) {
    const findUser = await this.userRepository.findOne({
      where: {
        email: payload.email,
      },
    });

    if (!findUser) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const isPassword = await compare(payload.password, findUser.password);

    if (!isPassword) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return payload;
  }
}
