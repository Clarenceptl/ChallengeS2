export enum SERVICE_CMD {
  GET_USER = 'get-user',
  GET_USER_BY_EMAIL = 'get-user-by-email',
  GET_USERS = 'get-users',
  UPDATE_USER = 'update-user',
  DELETE_USER = 'delete-user',
  CREATE_USER = 'create-user',
  GET_REGISTER_MAIL = 'get-mail-register',
  CREATE_APPOINTMENT = 'create-appointment',
  DELETE_APPOINTMENT = 'delete-appointment',
  UPDATE_APPOINTMENT = 'update-appointment',
  GET_APPOINTMENT_BY_ID = 'get-appointment-by-id',
  CREATE_COMPANY = 'create-company',
  GET_COMPANY_BY_ID = 'get-company-by-id',
  DELETE_COMPANY = 'delete-company',
  UPDATE_COMPANY = 'update-company',
  GET_COMPANIES = 'get-companies',
  VERIFY_ACCOUNT = 'auth_verify_account'
}

export enum SERVICE_NAME {
  AUTH = 'AUTH_SERVICE',
  APP = 'APPLICATION_SERVICE',
  MAILING = 'MAILING_SERVICE'
}
