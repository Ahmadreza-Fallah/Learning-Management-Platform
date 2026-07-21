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

export interface MyCourse {
  Id: number;
  Title: string;
  Thumbnail: string | null;
  Price: number;
  DiscountPrice: number | null;
  IsPublished: boolean;
  AverageRating: number;
  CreatedAt: string;
  Category: {
    Id: number;
    Title: string;
  };
  Level: {
    Id: number;
    LevelName: string;
  } | null;
}

class CourseService {
  async createCourse(data: CreateCourseData) {
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
}

export default new CourseService();
