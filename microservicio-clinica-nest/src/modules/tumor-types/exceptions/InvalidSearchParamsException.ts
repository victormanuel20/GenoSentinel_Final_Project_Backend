import { BadRequestException } from '@nestjs/common';

export class InvalidSearchParamsException extends BadRequestException {
  constructor() {
    super('Debe proporcionar al menos un criterio de búsqueda: name o systemAffected');
  }
}