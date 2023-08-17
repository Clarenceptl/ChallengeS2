export interface ErrorModel {
  statusCode: number;
  message: string;
}

export interface SuccessResponse {
  success: boolean;
  message?: string;
  data?: any;
}
