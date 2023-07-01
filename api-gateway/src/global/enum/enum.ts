export enum SERVICE_CMD {
  REGISTER_USER = 'auth_register',
  LOGIN_USER = 'auth_login',
  VERIFY_ACCOUNT = 'auth_verify_account',
  GET_USER = 'get-user',
  GET_USERS = 'get-users',
  GET_SELF_USER = 'get-self-user',
  GET_REFRESH_TOKEN = 'get-refresh-token',
  GET_COMPANY_SIZE_OPTIONS = 'get-company-size-options',
  GET_COMPANY_SIZE_OPTIONS_BY_ID = 'get-company-size-options-by-id',
  CREATE_COMPANY_SIZE_OPTIONS = 'create-company-size-options',
  UPDATE_COMPANY_SIZE_OPTIONS = 'update-company-size-options',
  DELETE_COMPANY_SIZE_OPTIONS = 'delete-company-size-options',
  GET_COMPANY_REVENUE_OPTIONS = 'get-company-revenue-options',
  GET_COMPANY_REVENUE_OPTIONS_BY_ID = 'get-company-revenue-options-by-id',
  CREATE_COMPANY_REVENUE_OPTIONS = 'create-company-revenue-options',
  UPDATE_COMPANY_REVENUE_OPTIONS = 'update-company-revenue-options',
  DELETE_COMPANY_REVENUE_OPTIONS = 'delete-company-revenue-options',
  GET_COMPANY_SECTOR_OPTIONS = 'get-company-sector-options',
  GET_COMPANY_SECTOR_OPTIONS_BY_ID = 'get-company-sector-options-by-id',
  CREATE_COMPANY_SECTOR_OPTIONS = 'create-company-sector-options',
  UPDATE_COMPANY_SECTOR_OPTIONS = 'update-company-sector-options',
  DELETE_COMPANY_SECTOR_OPTIONS = 'delete-company-sector-options'
}

export enum SERVICE_NAME {
  AUTH = 'AUTH_SERVICE',
  APP = 'APPLICATION_SERVICE'
}
