import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const existingUser = await this.prisma.users.findFirst({
      where: {
        OR: [{ Email: registerDto.email }, { UserName: registerDto.username }],
      },
    });
    if (existingUser) {
      throw new ConflictException('Email or Username already exists.');
    }
    const user = await this.prisma.users.create({
      data: {
        FirstName: registerDto.firstName,
        LastName: registerDto.lastName,
        UserName: registerDto.username,
        Email: registerDto.email,
        Mobile: registerDto.mobile,
        PasswordHash: hashedPassword,
        Role_Id: 3,
      },
    });

    return {
      message: 'User registered successfully.',
      user: {
        id: user.Id,
        firstName: user.FirstName,
        lastName: user.LastName,
        username: user.UserName,
        email: user.Email,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const user = this.prisma.users.findFirst({
      where: { UserName: loginDto.userName },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    if (!user.IsActive) {
      throw new UnauthorizedException('User account is inactive');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.PasswordHash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return {
      message: 'Login successful',
      user,
    };
  }
}
