import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signUp(signUpDto: any) {
    const user = await this.userService.getOneUser(signUpDto.email);
    console.log(user);

    if (user) throw new BadRequestException('user already exisist');

    return await this.userService.createUser(signUpDto);
  }
  async signIn(email: string, pass: string) {
    const user = await this.userService.getOneUser(email);

    if (!user) throw new BadRequestException('user not found');

    if (user.password != pass)
      throw new UnauthorizedException('pass dont match');

    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }
}
