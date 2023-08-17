export interface RegisterMailRequest {
  email: string;
  token: string;
  firstname: string;
}

export interface ResetPasswordMailRequest extends RegisterMailRequest { }
