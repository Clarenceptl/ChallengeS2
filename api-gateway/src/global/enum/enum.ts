export enum SERVICE_CMD {
  REGISTER_USER = 'auth_register',
  LOGIN_USER = 'auth_login',
  VERIFY_ACCOUNT = 'auth_verify_account',
  GET_USER = 'get-user',
  GET_SELF_USER = 'get-self-user',
  GET_REFRESH_TOKEN = 'get-refresh-token',
  GET_COMPANY_SIZE_OPTIONS = 'get-company-size-options'
}

export enum SERVICE_NAME {
  AUTH = 'AUTH_SERVICE',
  APP = 'APPLICATION_SERVICE'
}
