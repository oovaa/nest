import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUserdto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }
  @Post()
  async createUser(@Body() request: CreateUserDto) {
    return this.userService.createUser(request);
  }
}
