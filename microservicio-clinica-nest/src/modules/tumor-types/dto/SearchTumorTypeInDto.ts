import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchTumorTypeInDto {
  @ApiPropertyOptional({ 
    example: 'mama',
    description: 'Nombre del tipo de tumor (búsqueda parcial)',
  })
  @IsString({ message: 'El nombre debe ser texto' })
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ 
    example: 'respiratorio',
    description: 'Sistema afectado (búsqueda parcial)',
  })
  @IsString({ message: 'El sistema afectado debe ser texto' })
  @IsOptional()
  systemAffected?: string;
}