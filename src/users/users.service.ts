import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto); // new User() user.name = dto.name

    return this.usersRepository.save(newUser);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneOrFail(id)
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne(id);

    user.name = updateUserDto.name
    return this.usersRepository.save(user)
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne(id);
    return this.usersRepository.remove(user);
  }
}
