import api from "./api";

class UploadService {
  async uploadCourseImage(file: File) {
    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post("/upload/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }
  async uploadVideo(file: File) {
    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post("/upload/video", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }
  async uploadLessonFile(file: File) {
    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post("/upload/lesson-file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }
}

export default new UploadService();
