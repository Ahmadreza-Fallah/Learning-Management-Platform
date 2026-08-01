import api from "./api";

export interface PaymentRecord {
  Id: number;
  Course_Id: number;
  Amount: number;
  RefNumber: string | null;
  Status: number | null;
  CreatedAt: string;
}

export interface EnrollmentRecord {
  Id: number;
  Course_Id: number;
  Student_Id: number;
  Status: number | null;
  EnrollmentDate: string;
}

export interface CheckoutResponse {
  message: string;
  total: number;
  payments: PaymentRecord[];
  enrollments: EnrollmentRecord[];
}

class PaymentService {
  async checkout(): Promise<CheckoutResponse> {
    const response = await api.post("/payment/checkout");
    return response.data;
  }
}

export default new PaymentService();
