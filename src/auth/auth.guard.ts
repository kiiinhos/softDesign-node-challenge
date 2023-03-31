import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7, authHeader.length);

      try {
        const decoded = jwt.verify(token, 'secretKey'); 
        req['user'] = decoded; 
        return true;
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  }
}