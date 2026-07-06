import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: number) {
    const user = await this.prisma.users.findUnique({
      where: { Id: id },
      select: {
        Id: true,
        FirstName: true,
        LastName: true,
        UserName: true,
        Email: true,
        Mobile: true,
        Role_Id: true,
        IsActive: true,
        Avatar: true,
        CreatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findAll() {
    return this.prisma.users.findMany({
      select: {
        Id: true,
        FirstName: true,
        LastName: true,
        UserName: true,
        Email: true,
        Role_Id: true,
        IsActive: true,
        CreatedAt: true,
      },
    });
  }
}
