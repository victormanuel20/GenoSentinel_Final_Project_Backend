import { BadRequestException } from '@nestjs/common';

export class NoFieldsToUpdateException extends BadRequestException {
  constructor() {
    super('Debe proporcionar al menos un campo para actualizar (stage o treatmentProtocol)');
  }
}