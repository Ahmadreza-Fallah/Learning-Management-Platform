import api from "./api";

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  userName?: string;
  email?: string;
  mobile?: string;
  sexId?: number;
  avatar?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

class UserService {
  async getProfile() {
    const response = await api.get("/users/profile");
    return response.data;
  }

  async updateProfile(data: UpdateProfileRequest) {
    const response: any = await api.put("/users/profile", data);
    return response.data;
  }

  async changePassword(data: ChangePasswordRequest) {
    const response = await api.put("/users/change-password", data);

    return response.data;
  }
}

export default new UserService();
