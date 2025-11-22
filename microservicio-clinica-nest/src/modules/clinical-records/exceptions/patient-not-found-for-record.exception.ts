import { NotFoundException } from '@nestjs/common';

export class PatientNotFoundForRecordException extends NotFoundException {
  constructor(patientId: number) {
    super(`No se puede crear la historia clínica: el paciente con ID ${patientId} no existe`);
  }
}