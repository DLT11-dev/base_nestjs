import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@/common/enum/role';
import { ROLES_KEY } from '@/common/decorators/roles.decorator';
import { RequestModel } from '@/common/models/request.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest() as RequestModel;
    
    if (!user) {
      return false;
    }

    if (!user.isActive) {
      return false;
    }
    
    return requiredRoles.some((role) => user.role === role);
  }
} 