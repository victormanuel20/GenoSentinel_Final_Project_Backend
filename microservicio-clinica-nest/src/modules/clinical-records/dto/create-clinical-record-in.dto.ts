import { IsInt, IsNotEmpty, IsString, IsOptional, IsDateString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateClinicalRecordInDto {

@ApiProperty({ 
    example: 1,
    description: 'ID del paciente',
  })
  @IsInt({ message: 'El ID del paciente debe ser un número entero' })
  @Min(1, { message: 'El ID del paciente debe ser mayor a 0' })
  @IsNotEmpty({ message: 'El ID del paciente es obligatorio' })
  patientId: number;

  @ApiProperty({ 
    example: 1,
    description: 'ID del tipo de tumor',
  })
  @IsInt({ message: 'El ID del tipo de tumor debe ser un número entero' })
  @Min(1, { message: 'El ID del tipo de tumor debe ser mayor a 0' })
  @IsNotEmpty({ message: 'El ID del tipo de tumor es obligatorio' })
  tumorTypeId: number;

  @ApiProperty({ 
    example: '2023-05-20',
    description: 'Fecha de diagnóstico (formato YYYY-MM-DD)',
  })
  @IsDateString({}, { message: 'La fecha debe tener formato YYYY-MM-DD' })
  @IsNotEmpty({ message: 'La fecha de diagnóstico es obligatoria' })
  diagnosisDate: string;

  @ApiPropertyOptional({ 
    example: 'IIA',
    description: 'Etapa del cáncer (ej: IIA, III, IV)',
  })
  @IsString({ message: 'La etapa debe ser texto' })
  @IsOptional()
  stage?: string;

  @ApiPropertyOptional({ 
    example: 'Cirugía conservadora + quimioterapia adyuvante con docetaxel',
    description: 'Protocolo de tratamiento',
  })
  @IsString({ message: 'El protocolo de tratamiento debe ser texto' })
  @IsOptional()
  treatmentProtocol?: string;

}
