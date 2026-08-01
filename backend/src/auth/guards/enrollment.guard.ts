import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class EnrollmentGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const lessonId = Number(request.params.id ?? request.params.lessonId);

    if (!user || !lessonId) {
      throw new ForbiddenException('Access denied');
    }

    const lesson = await this.prisma.lessons.findUnique({
      where: { Id: lessonId },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    // Free preview lessons are open to everyone, enrolled or not.
    if (lesson.IsFreePreview) {
      return true;
    }

    const enrollment = await this.prisma.enrollments.findFirst({
      where: { Student_Id: user.id, Course_Id: lesson.Course_Id },
    });

    if (!enrollment) {
      throw new ForbiddenException(
        'You must be enrolled in this course to access this lesson',
      );
    }

    return true;
  }
}
