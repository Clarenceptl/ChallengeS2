export enum SERVICE_CMD {
  REGISTER_USER = 'auth_register',
  LOGIN_USER = 'auth_login',
  GET_REGISTER_MAIL = 'get-mail-register',
  SEND_EMAIL_RESET_PASSWORD = 'send-email-reset-password'
}

export enum SERVICE_NAME {
  AUTH = 'auth_service',
  APP = 'application_service',
  MAILING = 'mailing_service'
}
