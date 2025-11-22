import { NotFoundException } from '@nestjs/common';

export class NoRecordsFoundForPatientException extends NotFoundException {
  constructor(patientId: number) {
    super(`No se encontraron historias clínicas para el paciente con ID ${patientId}`);
  }
}