import { SetMetadata } from '@nestjs/common';

export const isPublic = () => {
  return SetMetadata('isPublic', true);
};
