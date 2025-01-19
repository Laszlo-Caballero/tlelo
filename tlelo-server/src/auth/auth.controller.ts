import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserLoginDto } from './dtos/userLogin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() user: UserDto) {
    return this.authService.register(user);
  }

  @Post('login')
  login(@Body() user: UserLoginDto) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('uploadImage/:id')
  uploadImage(@Param('id') id: string) {
    return 'this upload image';
    // return this.authService.uploadImage(user);
  }
}
