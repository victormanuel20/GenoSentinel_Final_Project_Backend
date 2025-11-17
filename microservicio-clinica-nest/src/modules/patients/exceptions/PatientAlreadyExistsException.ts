import { ConflictException } from '@nestjs/common';

export class PatientAlreadyExistsException extends ConflictException {
  constructor(firstName: string, lastName: string, birthDate: string) {
    super(
      `Ya existe un paciente con el nombre ${firstName} ${lastName} y fecha de nacimiento ${birthDate}`
    );
  }
}