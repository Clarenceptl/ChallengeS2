export enum SERVICE_CMD {
  REGISTER_USER = 'auth_register',
  LOGIN_USER = 'auth_login',
  GET_USER_BY_EMAIL = 'get-user-by-email',
  CREATE_USER = 'create-user',
  VERIFY_ACCOUNT = 'auth_verify_account',
  GET_REFRESH_TOKEN = 'get-refresh-token',
  UPDATE_TOKEN_USER = 'update-token-user',
  SEND_EMAIL_RESET_PASSWORD = 'send-email-reset-password',
  RESET_PASSWORD = 'reset-password'
}

export enum SERVICE_NAME {
  AUTH = 'AUTH_SERVICE',
  APP = 'APP_SERVICE',
  MAIL = 'MAIL_SERVICE'
}
