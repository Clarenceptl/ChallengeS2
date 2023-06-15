export enum SERVICE_CMD {
  REGISTER_USER = 'auth_register',
  LOGIN_USER = 'auth_login',
  GET_USER_BY_EMAIL = 'get-user-by-email',
  CREATE_USER = 'create-user',
  VERIFY_ACCOUNT = 'auth_verify_account',
  GET_REFRESH_TOKEN = 'get-refresh-token'
}

export enum SERVICE_NAME {
  AUTH = 'AUTH_SERVICE',
  APP = 'APP_SERVICE'
}
