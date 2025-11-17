import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { PatientStatus } from '../entities/patient.entity';

export class DesactivatePatientDto{
  @ApiProperty({ 
    enum: PatientStatus,
    example: PatientStatus.INACTIVO,
    description: 'Estado al que se cambiará el paciente',
    default: PatientStatus.INACTIVO
  })
  @IsEnum(PatientStatus, { message: 'El estado debe ser Activo, Seguimiento o Inactivo' })
  status: PatientStatus = PatientStatus.INACTIVO;


}