import { NotFoundException } from '@nestjs/common';

export class NoRecordsFoundForTumorTypeException extends NotFoundException {
  constructor(tumorTypeId: number) {
    super(`No se encontraron historias clínicas para el tipo de tumor con ID ${tumorTypeId}`);
  }
}