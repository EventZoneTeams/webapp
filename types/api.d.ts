export interface ApiResponse<T> {
  isSuccess: boolean;
  error: string | null;
  data: T | null;
}
