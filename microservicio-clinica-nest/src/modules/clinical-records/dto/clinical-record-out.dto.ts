import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// DTOs anidados para mostrar información relacionada
class PatientSummaryDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Ana García López' })
  fullName: string;

  @ApiProperty({ example: 'Femenino' })
  gender: string;

  @ApiProperty({ example: 'Activo' })
  status: string;
}

class TumorTypeSummaryDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Cáncer de mama' })
  name: string;

  @ApiProperty({ example: 'Glándulas' })
  systemAffected: string;
}

export class ClinicalRecordOutDto {
  @ApiProperty({ example: 1, description: 'ID de la historia clínica' })
  id: number;

  @ApiProperty({ example: 1, description: 'ID del paciente' })
  patientId: number;

  @ApiProperty({ example: 1, description: 'ID del tipo de tumor' })
  tumorTypeId: number;

  @ApiProperty({ example: '2023-05-20', description: 'Fecha de diagnóstico' })
  diagnosisDate: string;

  @ApiPropertyOptional({ example: 'IIA', description: 'Etapa del cáncer' })
  stage?: string;

  @ApiPropertyOptional({ 
    example: 'Cirugía conservadora + quimioterapia adyuvante',
    description: 'Protocolo de tratamiento' 
  })
  treatmentProtocol?: string;

  @ApiProperty({ type: PatientSummaryDto, description: 'Información del paciente' })
  patient: PatientSummaryDto;

  @ApiProperty({ type: TumorTypeSummaryDto, description: 'Información del tipo de tumor' })
  tumorType: TumorTypeSummaryDto;
}