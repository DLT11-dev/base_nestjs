import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({ description: 'ID của user' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Email của user' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: 'Username của user' })
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @ApiProperty({ description: 'Họ và tên' })
  @Column()
  fullName: string;

  @ApiProperty({ description: 'Trạng thái hoạt động' })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ description: 'Thời gian tạo' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Thời gian cập nhật' })
  @UpdateDateColumn()
  updatedAt: Date;
} 