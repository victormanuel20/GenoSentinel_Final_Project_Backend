import { NotFoundException } from '@nestjs/common';

export class TumorTypeNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Tipo de tumor con ID ${id} no encontrado`);
  }
}