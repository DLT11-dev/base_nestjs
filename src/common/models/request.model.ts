import { Request } from 'express';
import { Role } from '../enum/role';


export class RequestModel extends Request {
    user: {
        id: number;
        fullName: string;
        email: string;
        role: Role;
        isActive: boolean;
    }
}