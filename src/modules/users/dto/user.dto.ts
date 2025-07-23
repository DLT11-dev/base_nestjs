import { Role } from '@/common/enum/role';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsNotEmpty, IsEnum, IsOptional, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'email', example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'username', example: 'username123' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'password', example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: 'fullName', example: 'Nguyen Van A', required: false })
  @IsString()
  @IsOptional()
  fullName: string;

  @ApiProperty({ description: 'role', enum: Role, default: Role.USER, required: false })
  @IsEnum(Role)
  @IsOptional()
  role: Role;

  @ApiProperty({ description: 'isActive', example: true, required: false })
  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}


export class UpdateUserDto {
    @ApiProperty({ description: 'email', example: 'user@example.com', required: false })
    @IsEmail()
    @IsOptional()
    email: string;
  
    @ApiProperty({ description: 'username', example: 'username123', required: false })
    @IsString()
    @IsOptional()
    username: string;
  
    @ApiProperty({
      description: 'fullName',
      example: 'Nguyen Van A',
      required: false,
    })
    @IsString()
    @IsOptional()
    fullName: string;
  
    @ApiProperty({
      description: 'role',
      enum: Role,
      default: Role.USER,
      required: false,
    })
    @IsEnum(Role)
    @IsOptional()
    role: Role;
  
    @ApiProperty({ description: 'isActive', example: true, required: false })
    @IsBoolean()
    @IsOptional()
    isActive: boolean;
  }

  export class UserResponseDto {
    @ApiProperty({ description: 'email', example: 'user@example.com', required: false })
    @IsEmail()
    @IsOptional()
    email: string;
  
    @ApiProperty({ description: 'username', example: 'username123', required: false })
    @IsString()
    @IsOptional()
    username: string;
  
    @ApiProperty({
      description: 'fullName',
      example: 'Nguyen Van A',
      required: false,
    })
    @IsString()
    @IsOptional()
    fullName: string;
  
    @ApiProperty({
      description: 'role',
      enum: Role,
      default: Role.USER,
      required: false,
    })
    @IsEnum(Role)
    @IsOptional()
    role: Role;
  
    @ApiProperty({ description: 'isActive', example: true, required: false })
    @IsBoolean()
    @IsOptional()
    isActive: boolean;
  }
  



