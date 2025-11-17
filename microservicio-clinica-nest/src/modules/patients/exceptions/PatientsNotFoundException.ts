import { NotFoundException } from '@nestjs/common';
import { SearchPatientDto } from '../dto/search-patient.dto';

export class PatientsNotFoundException extends NotFoundException {
  constructor(filters: SearchPatientDto) {
    const parts: string[] = [];

    if (filters.firstName) parts.push(`nombre="${filters.firstName}"`);
    if (filters.lastName) parts.push(`apellido="${filters.lastName}"`);
    if (filters.birthDate) parts.push(`fecha="${filters.birthDate}"`);

    const criteria = parts.join(', ');

    super(`No se encontraron pacientes con los criterios: ${criteria}`);
  }
}