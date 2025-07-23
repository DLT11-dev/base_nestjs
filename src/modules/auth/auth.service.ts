import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/modules/users/users.service';
import { ConfigService } from '@nestjs/config';
import { PasswordHelper } from '@/common/helpers/password.helper';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    // find user by username or email
    let user = await this.usersService.findByUsername(username);
    if (!user) {
      user = await this.usersService.findByEmail(username);
    }

    if (user && (await PasswordHelper.comparePassword(password, user.password))) {
      const { password: _password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const accessPayload = { 
      sub: user.id,
      type: 'access'
    };
    
    const refreshPayload = { 
      sub: user.id,
      type: 'refresh'
    };
    
    return {
      access_token: this.jwtService.sign(accessPayload, { 
        expiresIn: this.configService.get('JWT_EXPIRES_IN') 
      }),
      refresh_token: this.jwtService.sign(refreshPayload, { 
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN') 
      }),
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      
      if (payload.type !== 'refresh') {
        throw new Error('Invalid token type');
      }

      const user = await this.usersService.findById(payload.sub);
      if (!user) {
        throw new Error('User not found');
      }

      const accessPayload = { 
        sub: user.id,
        type: 'access'
      };

      const refreshPayload = { 
        sub: user.id,
        type: 'refresh'
      };

      return {
        access_token: this.jwtService.sign(accessPayload, { 
          expiresIn: this.configService.get('JWT_EXPIRES_IN') 
        }),
        refresh_token: this.jwtService.sign(refreshPayload, { 
          expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN') 
        }),
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
        },
      };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }
}
