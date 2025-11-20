import { ConflictException } from '@nestjs/common';

export class PatientAlreadyInactiveException extends ConflictException {
  constructor(id: number) {
    super(`El paciente con ID '${id}' ya está inactivo`);
  }
}
