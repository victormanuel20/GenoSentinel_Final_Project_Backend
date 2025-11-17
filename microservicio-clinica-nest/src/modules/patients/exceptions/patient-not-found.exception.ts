import { NotFoundException } from '@nestjs/common';

export class PatientNotFoundException extends NotFoundException {
  constructor(identifier: string | number) {
    super(`Paciente con identificador '${identifier}' no encontrado`);
  }
}