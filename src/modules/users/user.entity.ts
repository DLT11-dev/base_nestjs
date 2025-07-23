import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@/common/enum/role';

@Entity('users')
export class User {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'email' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: 'username' })
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @ApiProperty({ description: 'fullName' })
  @Column()
  fullName: string;

  @ApiProperty({ description: 'role' })
  @Column({ default: Role.USER })
  role: Role;

  @ApiProperty({ description: 'isActive' })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ description: 'createdAt' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'updatedAt' })
  @UpdateDateColumn()
  updatedAt: Date;
}
