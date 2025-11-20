import { BadRequestException } from '@nestjs/common';

export class EmptyUpdateDataException extends BadRequestException {
  constructor() {
    super('Debe proporcionar al menos un campo para actualizar (name o systemAffected)');
  }
}