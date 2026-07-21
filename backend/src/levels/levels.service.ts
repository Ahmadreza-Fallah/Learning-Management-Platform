import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LevelsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.level.findMany({
      orderBy: { LevelName: 'asc' },
    });
  }
}
