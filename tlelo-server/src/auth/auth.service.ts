import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dtos/user.dto';
import { ReturnBody, ReturnUserBody, UserJwt } from 'src/types/types';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './dtos/userLogin.dto';
import { ImagesService } from 'src/images/images.service';
import { ImageUsers } from 'src/Images/entity/image.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private ImageUserService: ImagesService,
  ) {}

  async register(userDto: UserDto): Promise<ReturnUserBody<Partial<User>>> {
    const { email, password, username } = userDto;

    const findUserEmail = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (findUserEmail) {
      return {
        status: 400,
        message: 'User already exists',
        data: null,
        token: '',
      };
    }

    const findUserUsername = await this.userRepository.findOne({
      where: {
        username,
      },
    });

    if (findUserUsername) {
      return {
        status: 400,
        message: 'Username already exists',
        data: null,
        token: '',
      };
    }

    const passwordHash = await hash(password, 10);

    const newUser = this.userRepository.create({
      ...userDto,
      password: passwordHash,
    });

    const payload = { password, email: newUser.email };

    const token = await this.jwtService.sign(payload);

    const saveUser = await this.userRepository.save(newUser);

    return {
      data: saveUser,
      message: 'User created',
      status: 200,
      token,
    };
  }

  async login(userDto: UserLoginDto): Promise<ReturnUserBody<Partial<User>>> {
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
    const payload = { password, email: findUser.email };

    const token = await this.jwtService.sign(payload);

    return {
      status: 200,
      message: 'Login success',
      data: findUser,
      token,
    };
  }

  async uploadImage(
    userName: string,
    user: UserJwt,
    file: Express.Multer.File,
  ): Promise<ReturnBody<ImageUsers>> {
    const findUser = await this.userRepository.findOne({
      where: {
        username: userName,
      },
    });

    if (!findUser) {
      return {
        status: 400,
        message: 'User not found',
        data: null,
      };
    }

    if (findUser.email !== user.email) {
      return {
        status: 400,
        message: 'Unauthorized',
        data: null,
      };
    }

    const isPassword = await compare(user.password, findUser.password);

    if (!isPassword) {
      return {
        status: 400,
        message: 'Invalid credentials',
        data: null,
      };
    }

    const image = await this.ImageUserService.createImage(file, findUser);

    return {
      status: 200,
      message: 'Image uploaded',
      data: image,
    };
  }
}
