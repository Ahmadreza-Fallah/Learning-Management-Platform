import api from "./api";

export interface CreateCourseData {
  title: string;
  shortDescription?: string;
  description?: string;
  price: number;
  discountPrice?: number;
  categoryId: number;
  levelId?: number;
  durationMinutes?: number;
  thumbnail?: string;
}

export interface Category {
  Id: number;
  Title: string;
  Description?: string;
}

export interface Level {
  Id: number;
  LevelName: string;
}

export interface MyCourse {
  Id: number;
  Title: string;
  Thumbnail: string | null;
  Price: number;
  DiscountPrice: number | null;
  IsPublished: boolean;
  CreatedAt: string;
  AverageRating: number;
  Category: {
    Id: number;
    Title: string;
  };
  Level: {
    Id: number;
    LevelName: string;
  } | null;
}

export interface Course {
  Id: number;
  Title: string;
  Description: string | null;
  Price: number;
  DiscountPrice: number | null;
  IsPublished: boolean;
  CreatedAt: string;
  Slug: string | null;
  Thumbnail: string | null;
  ShortDescription: string | null;
  DurationMinutes: number | null;
  AverageRating: number;
  Category: { Id: number; Title: string };
  Level: { Id: number; LevelName: string } | null;
  Users?: { Id: number; FirstName: string; LastName: string };
  Sections?: Section[];
}

export interface Section {
  Id: number;
  Title: string;
  DisplayOrder: number | null;
  Course_Id: number;
  CreatedAt: string;
  Lessons?: Lesson[];
}

export interface Lesson {
  Id: number;
  Title: string;
  Description: string | null;
  VideoUrl: string | null;
  DurationMinutes: number | null;
  SortOrder: number | null;
  IsFreePreview: boolean;
  CreatedAt: string;
  IsPublished: boolean;
  Course_Id: number;
  Section_Id: number | null;
  LessonFiles?: LessonFile[];
}

export interface LessonFile {
  Id: number;
  FileName: string | null;
  FileUrl: string | null;
  CreatedAt: string;
  Lesson_Id: number;
}

class CourseService {
  async createCourse(data: CreateCourseData): Promise<Course> {
    const response = await api.post("/courses", data);
    return response.data;
  }

  async getCategories(): Promise<Category[]> {
    const response = await api.get("/categories");
    return response.data;
  }

  async getLevels(): Promise<Level[]> {
    const response = await api.get("/levels");
    return response.data;
  }

  async getMyCourses(): Promise<MyCourse[]> {
    const response = await api.get("/courses/my");
    return response.data;
  }

  async getCourse(id: number): Promise<Course> {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  }

  async updateCourse(
    id: number,
    data: Partial<CreateCourseData>,
  ): Promise<Course> {
    const response = await api.put(`/courses/${id}`, data);
    return response.data;
  }

  async deleteCourse(id: number): Promise<void> {
    await api.delete(`/courses/${id}`);
  }

  async publishCourse(id: number): Promise<Course> {
    const response = await api.put(`/courses/${id}/publish`);
    return response.data;
  }

  async getSections(courseId: number): Promise<Section[]> {
    const response = await api.get(`/courses/${courseId}/sections`);
    return response.data;
  }

  async createSection(
    courseId: number,
    data: { title: string; displayOrder?: number },
  ): Promise<Section> {
    const response = await api.post(`/courses/${courseId}/sections`, data);
    return response.data;
  }

  async updateSection(
    id: number,
    data: { title?: string; displayOrder?: number },
  ): Promise<Section> {
    const response = await api.put(`/sections/${id}`, data);
    return response.data;
  }

  async deleteSection(id: number): Promise<void> {
    await api.delete(`/sections/${id}`);
  }

  async getLessons(sectionId: number): Promise<Lesson[]> {
    const response = await api.get(`/sections/${sectionId}/lessons`);
    return response.data;
  }

  async createLesson(
    sectionId: number,
    data: {
      title: string;
      description?: string;
      videoUrl?: string;
      durationMinutes?: number;
      displayOrder?: number;
      isFreePreview?: boolean;
    },
  ): Promise<Lesson> {
    const response = await api.post(`/sections/${sectionId}/lessons`, data);
    return response.data;
  }

  async updateLesson(
    id: number,
    data: {
      title?: string;
      description?: string;
      videoUrl?: string;
      durationMinutes?: number;
      displayOrder?: number;
      isFreePreview?: boolean;
    },
  ): Promise<Lesson> {
    const response = await api.put(`/lessons/${id}`, data);
    return response.data;
  }

  async deleteLesson(id: number): Promise<void> {
    await api.delete(`/lessons/${id}`);
  }

  async getLessonFiles(lessonId: number): Promise<LessonFile[]> {
    const response = await api.get(`/lessons/${lessonId}/files`);
    return response.data;
  }

  async createLessonFile(
    lessonId: number,
    data: { fileName: string; fileUrl: string },
  ): Promise<LessonFile> {
    const response = await api.post(`/lessons/${lessonId}/files`, data);
    return response.data;
  }

  async deleteLessonFile(id: number): Promise<void> {
    await api.delete(`/lesson-files/${id}`);
  }
}

export default new CourseService();
