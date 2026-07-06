import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: { sub: number; username: string; role: number }) {
    const user = await this.prisma.users.findUnique({
      where: { Id: payload.sub },
      select: {
        Id: true,
        FirstName: true,
        LastName: true,
        UserName: true,
        Email: true,
        Role_Id: true,
        IsActive: true,
      },
    });

    if (!user || !user.IsActive) {
      throw new UnauthorizedException();
    }

    return {
      id: user.Id,
      firstName: user.FirstName,
      lastName: user.LastName,
      userName: user.UserName,
      email: user.Email,
      roleId: user.Role_Id,
    };
  }
}
