export type PaginationType = {
  page: number;
  limit: number;
  total: number;
};

export type ApiResponse<Data> = {
  data: Data;
  errors: string[] | null;
};

export type PaginatedApiResponse<Data> = {
  data: Data;
  errors: string[] | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
};
