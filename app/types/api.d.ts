export type ApiResponse<T> = {
  statusCode: number;
  status: "success" | "error";
  data: T;
  metadata: {
    timestamp: string;
  };
};

export type ApiErrorResponse = {
  statusCode: number;
  status: "success" | "error";
  error: string;
  message: string;
  metadata: {
    timestamp: string;
  };
};

export type PaginatedResponse<T> = {
  items: T[];
  totalItems: number;
  totalPages: number;
  current: number;
  limit: number;
};
