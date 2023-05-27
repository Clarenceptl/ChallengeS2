import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorModel } from '../../global';

export const handleErrors = (err: ErrorModel) => {
  if (err.statusCode) {
    throw new HttpException(err?.message, err.statusCode);
  } else {
    throw new HttpException(
      'Une erreur est survenue',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};
