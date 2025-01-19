import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() user: UserDto) {
    return this.authService.register(user);
  }

  @Post('login')
  login(@Body() user: UserDto) {
    return this.authService.login(user);
  }
}
