import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { PasswordHelper } from '@/common/helpers/password.helper';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, username, password, fullName, role , isActive} = createUserDto;

    const existingEmail = await this.usersRepository.findOne({
      where: { email },
    });
    if (existingEmail) {
      throw new ConflictException('Email or username already exists');
    }

    const existingUsername = await this.usersRepository.findOne({
      where: { username },
    });
    if (existingUsername) {
      throw new ConflictException('Email or username already exists');
    }

    // Hash password
    const hashedPassword = await PasswordHelper.hashPassword(password);

    const user = this.usersRepository.create({
      email,
      username,
      role,
      isActive,
      password: hashedPassword,
      fullName,
    });

    const savedUser = await this.usersRepository.save(user);

    // delete password
    delete savedUser.password;
    return savedUser;
  }

  async findByUsername(username: string): Promise<User| null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersRepository.find();
    return users.map((user) => {
      delete user.password;
      return user;
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const conflicts = [];
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      conflicts.push({ email: updateUserDto.email });
    }
    if (updateUserDto.username && updateUserDto.username !== user.username) {
      conflicts.push({ username: updateUserDto.username });
    }

    if (conflicts.length > 0) {
      const existingUsers = await this.usersRepository.find({
        where: conflicts,
      });

      for (const existingUser of existingUsers) {
        if (existingUser.id !== id) {
          if (existingUser.email === updateUserDto.email) {
            throw new ConflictException('Email already exists');
          }
          if (existingUser.username === updateUserDto.username) {
            throw new ConflictException('Username already exists');
          }
        }
      }
    }

    const updateData = {};
    Object.keys(updateUserDto).forEach(key => {
      if (updateUserDto[key] !== undefined) {
        updateData[key] = updateUserDto[key];
      }
    });

    await this.usersRepository.update(id, updateData);
    
    const updatedUser = await this.usersRepository.findOne({ where: { id } });
    delete updatedUser.password;
    return updatedUser;
  }

  async delete(id: number): Promise<UserResponseDto> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.usersRepository.delete(id);
    return user;
  }
}
