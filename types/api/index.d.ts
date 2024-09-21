export type ApiResponse<T> = {
  isSuccess: boolean;
  message: string | null;
  data: T | null;
};

export type Paging = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
};

export interface ApiResponseWithPaging<T> extends ApiResponse<T> {
  paging?: Paging;
}
