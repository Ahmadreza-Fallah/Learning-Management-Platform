import toast from "react-hot-toast";
import api from "./api";

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  mobile: string;
  password: string;
}

export interface LoginRequest {
  userName: string;
  password: string;
}

class AuthService {
  async register(data: RegisterRequest) {
    debugger;

    try {
      const response = await api.post("/auth/register", data);
      toast.success("Successfully saved!");
      return response.data;
    } catch (ex) {
      debugger;
    }
  }

  async login(data: LoginRequest) {
    const response = await api.post("/auth/login", data);
    return response.data;
  }

  async logout(refreshToken: string) {
    const response = await api.post("/auth/logout", {
      refreshToken,
    });

    return response.data;
  }

  async refresh(refreshToken: string) {
    const response = await api.post("/auth/refresh", {
      refreshToken,
    });

    return response.data;
  }
}

export default new AuthService();
