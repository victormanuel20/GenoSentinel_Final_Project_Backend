import { IsString, IsOptional, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchPatientDto {
  @ApiPropertyOptional({ 
    example: 'Ana',
    description: 'Nombre del paciente (búsqueda parcial)',
  })
  @IsString({ message: 'El nombre debe ser texto' })
  @IsOptional()
  firstName?: string;

  @ApiPropertyOptional({ 
    example: 'García',
    description: 'Apellido del paciente (búsqueda parcial)',
  })
  @IsString({ message: 'El apellido debe ser texto' })
  @IsOptional()
  lastName?: string;

  @ApiPropertyOptional({ 
    example: '1990-05-10',
    description: 'Fecha de nacimiento exacta (formato YYYY-MM-DD)',
  })
  @IsDateString({}, { message: 'La fecha debe tener formato YYYY-MM-DD' })
  @IsOptional()
  birthDate?: string;
}