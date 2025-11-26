import { HttpException, HttpStatus } from '@nestjs/common';

export class CannotDeleteActivePatientException extends HttpException {
  constructor(id: number) {
    super(
      `No se puede eliminar el paciente con ID ${id} porque aún está ACTIVO. Debe desactivarlo antes de eliminarlo.`,
      HttpStatus.CONFLICT,
    );
  }
}
