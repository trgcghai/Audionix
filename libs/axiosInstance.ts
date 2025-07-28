import axios from "axios";
import type { InternalAxiosRequestConfig, AxiosError } from "axios";

// ============================================================
// Cấu hình mặc định cho các request
// ============================================================
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BE_URL, // URL của backend
  withCredentials: true, // cho phép gửi cookie trong request
  timeout: 1000 * 60 * 10, // thời gian timeout là 10 phút
});

// ============================================================
// Interceptor: Xử lý lỗi 401 và errorCode UNAUTHORIZED
// ============================================================

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // =====================
    // CHECK LỖI JWT
    // =====================
    const isUnauthorized = error.response?.status === 401;

    if (isUnauthorized && !originalRequest._retry) {
      // ====================
      // Logout ở đây
      // ====================

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

// ============================================================

export default axiosClient;
