export interface BaseEmailRequest {
  email: string;
  equipe?: string;
}

export interface RegisterMailRequest extends BaseEmailRequest {
  token: string;
  firstname: string;
}

export interface RegisterMailBO extends BaseEmailRequest {
  fullname: string;
}

export interface ConfirmationAccount extends BaseEmailRequest {
  fullname: string;
  valid: boolean;
}
