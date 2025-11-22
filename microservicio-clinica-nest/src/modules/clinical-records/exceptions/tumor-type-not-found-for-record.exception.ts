import { NotFoundException } from '@nestjs/common';

export class TumorTypeNotFoundForRecordException extends NotFoundException {
  constructor(tumorTypeId: number) {
    super(`No se puede crear la historia clínica: el tipo de tumor con ID ${tumorTypeId} no existe`);
  }
}