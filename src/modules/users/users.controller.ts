import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dto/user.dto';
import { AuthRoles } from '@/common/decorators/roles.decorator';
import { Role } from '@/common/enum/role';
import { RequestModel } from '@/common/models/request.model';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @Get('profile')
  @AuthRoles(Role.USER, Role.MANAGER, Role.ADMIN)
  async getProfile(@Request() req: RequestModel): Promise<UserResponseDto> {
    console.log(req.user)
    return this.usersService.findById(req.user.id);
  }

  @Get()
  @AuthRoles(Role.MANAGER, Role.ADMIN)
  async findAll(): Promise<UserResponseDto[]> {
    return this.usersService.findAll();
  }

  @Patch(':id')
  @AuthRoles(Role.USER, Role.MANAGER, Role.ADMIN)
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @AuthRoles(Role.ADMIN)
  async delete(@Param('id') id: number): Promise<UserResponseDto> {
    return this.usersService.delete(id);
  }
}
