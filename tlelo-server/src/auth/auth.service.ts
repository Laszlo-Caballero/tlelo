import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dtos/user.dto';
import { ReturnUserBody } from 'src/types/types';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(userDto: UserDto): Promise<ReturnUserBody<Partial<User>>> {
    const { email, password } = userDto;

    const findUser = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (findUser) {
      return {
        status: 400,
        message: 'User already exists',
        data: null,
        token: '',
      };
    }

    const passwordHash = await hash(password, 10);

    const newUser = this.userRepository.create({
      ...userDto,
      password: passwordHash,
    });

    const payload = { password: newUser.password, email: newUser.email };

    const token = await this.jwtService.sign(payload);

    const saveUser = await this.userRepository.save(newUser);

    return {
      data: saveUser,
      message: 'User created',
      status: 200,
      token,
    };
  }

  async login(userDto: UserDto): Promise<ReturnUserBody<Partial<User>>> {
    const { email, password } = userDto;

    const findUser = await this.userRepository.findOne({
      where: {
        email,
      },
      relations: ['image'],
    });

    if (!findUser) {
      return {
        status: 400,
        message: 'User not found',
        data: null,
        token: '',
      };
    }

    const isPassword = await compare(password, findUser.password);

    if (!isPassword) {
      return {
        status: 400,
        message: 'Incorrect password',
        data: null,
        token: '',
      };
    }
    const payload = { password: findUser.password, email: findUser.email };

    const token = await this.jwtService.sign(payload);

    return {
      status: 200,
      message: 'Login success',
      data: findUser,
      token,
    };
  }
}
