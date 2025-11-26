import { NotFoundException } from '@nestjs/common';

export class ClinicalRecordNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Historia clínica con ID ${id} no encontrada`);
  }
}