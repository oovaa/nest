import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const users: CreateUserDto[] = [];

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    createUserDto.id = users.length + 1;
    users.push(createUserDto);
    return createUserDto;
  }

  findAll() {
    return users;
  }

  findOne(id: number) {
    const user = users.find((x) => x.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    users[idx] = { ...users[idx], ...updateUserDto, id };
    return users[idx];
  }

  remove(id: number) {
    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const [removed] = users.splice(idx, 1);
    return removed;
  }
}
