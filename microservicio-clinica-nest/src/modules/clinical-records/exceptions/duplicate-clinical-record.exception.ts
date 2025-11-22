import { ConflictException } from '@nestjs/common';

export class DuplicateClinicalRecordException extends ConflictException {
  constructor(patientId: number, tumorTypeId: number, diagnosisDate: string) {
    super(
      `Ya existe una historia clínica para el paciente ${patientId} con el tipo de tumor ${tumorTypeId} en la fecha ${diagnosisDate}`
    );
  }
}