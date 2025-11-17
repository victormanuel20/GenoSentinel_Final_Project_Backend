import { BadRequestException } from '@nestjs/common';

export class PatientUpdateFailedException extends BadRequestException {
  constructor(id: number, reason?: string) {
    const message = reason 
      ? `No se pudo actualizar el paciente con ID ${id}: ${reason}`
      : `No se pudo actualizar el paciente con ID ${id}`;
    super(message);
  }
}