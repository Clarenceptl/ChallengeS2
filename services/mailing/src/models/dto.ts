export interface RegisterMailRequest {
  email: string;
  token: string;
  firstname: string;
}

export type ResetPasswordMailRequest = RegisterMailRequest;
