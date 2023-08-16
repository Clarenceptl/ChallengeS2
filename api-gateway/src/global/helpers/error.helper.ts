import { HttpException, HttpStatus } from '@nestjs/common';
import type { ErrorModel } from '../../global';

export const handleErrors = (err: ErrorModel) => {
  console.log(err);
  if (err.statusCode) {
    throw new HttpException(err?.message, err.statusCode);
  } else {
    throw new HttpException(
      'Une erreur est survenue',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};
