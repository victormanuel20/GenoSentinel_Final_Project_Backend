import { ConflictException } from '@nestjs/common';

export class TumorTypeAlreadyExistsException extends ConflictException {
  constructor(name: string) {
    super(`Ya existe un tipo de tumor con el nombre "${name}"`);
  }
}