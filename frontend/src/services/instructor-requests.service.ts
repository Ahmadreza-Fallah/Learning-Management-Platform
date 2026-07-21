import api from "./api";

export interface CreateInstructorRequest {
  description?: string;
}

class InstructorRequestService {
  async create(data: CreateInstructorRequest) {
    const response = await api.post("/instructor-requests", data);
    return response.data;
  }
}

export default new InstructorRequestService();
