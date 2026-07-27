import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLessonFileDto } from './dto/create-lesson-file.dto';

@Injectable()
export class LessonFilesService {
  constructor(private prisma: PrismaService) {}

  private async verifyLessonOwnership(lessonId: number, userId: number) {
    const lesson = await this.prisma.lessons.findUnique({
      where: { Id: lessonId },
      include: { Courses: true },
    });
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    if (lesson.Courses.Teacher_Id !== userId) {
      throw new ForbiddenException(
        'You can only manage files for your own lessons',
      );
    }
    return lesson;
  }

  private async verifyFileOwnership(fileId: number, userId: number) {
    const file = await this.prisma.lessonFiles.findUnique({
      where: { Id: fileId },
      include: {
        Lessons: {
          include: { Courses: true },
        },
      },
    });
    if (!file) {
      throw new NotFoundException('Lesson file not found');
    }
    if (file.Lessons.Courses.Teacher_Id !== userId) {
      throw new ForbiddenException(
        'You can only manage files for your own lessons',
      );
    }
    return file;
  }

  async create(lessonId: number, userId: number, dto: CreateLessonFileDto) {
    await this.verifyLessonOwnership(lessonId, userId);

    const file = await this.prisma.lessonFiles.create({
      data: {
        Lesson_Id: lessonId,
        FileName: dto.fileName,
        FileUrl: dto.fileUrl,
        FileType: dto.fileType,
        FileSize: BigInt(dto.fileSize),
        FileExtension: dto.fileExtension,
        DownloadCount: 0,
      },
    });

    return {
      ...file,
      FileSize: file.FileSize?.toString(),
    };
  }

  async findByLesson(lessonId: number) {
    const lesson = await this.prisma.lessons.findUnique({
      where: { Id: lessonId },
    });
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    return this.prisma.lessonFiles.findMany({
      where: { Lesson_Id: lessonId },
      orderBy: { CreatedAt: 'asc' },
    });
  }

  async remove(id: number, userId: number) {
    await this.verifyFileOwnership(id, userId);

    await this.prisma.lessonFiles.delete({ where: { Id: id } });
    return { message: 'Lesson file deleted successfully' };
  }
}
