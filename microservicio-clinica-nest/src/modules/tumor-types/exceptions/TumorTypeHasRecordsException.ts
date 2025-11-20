import { ConflictException } from '@nestjs/common';

export class TumorTypeHasRecordsException extends ConflictException {
  constructor(id: number, recordCount: number) {
    super(
      `No se puede eliminar el tipo de tumor con ID ${id} porque tiene ${recordCount} historia(s) clínica(s) asociada(s)`
    );
  }
}