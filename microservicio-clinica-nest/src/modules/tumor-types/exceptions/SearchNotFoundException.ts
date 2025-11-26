import { NotFoundException } from '@nestjs/common';
import { SearchTumorTypeInDto } from '../dto/SearchTumorTypeInDto';

export class SearchNotFoundException extends NotFoundException {
  constructor(searchDto: SearchTumorTypeInDto) {
    const criteria: string[] = [];

    if (searchDto.name) {
      criteria.push(`nombre: "${searchDto.name}"`);
    }

    if (searchDto.systemAffected) {
      criteria.push(`sistema afectado: "${searchDto.systemAffected}"`);
    }

    const criteriaText = criteria.length > 0 ? criteria.join(', ') : 'sin criterios definidos';
    super(`No se encontraron tipos de tumor con los criterios: ${criteriaText}`);
  }
}
