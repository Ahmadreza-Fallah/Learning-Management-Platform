import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { InstructorRequestsModule } from './instructure-requests/instructure-requests.module';
import { CoursesModule } from './courses/courses.module';
import { CategoriesModule } from './categories/categories.module';
import { LevelsModule } from './levels/levels.module';
@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    InstructorRequestsModule,
    CoursesModule,
    CategoriesModule,
    LevelsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
