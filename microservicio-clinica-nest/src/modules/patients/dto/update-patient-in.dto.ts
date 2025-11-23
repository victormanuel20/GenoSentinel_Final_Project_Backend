import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientInDto } from './create-patient-in.dto';
import { IsEnum, IsOptional, IsString, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Gender, PatientStatus } from '../entities/patient.entity';

export class UpdatePatientInDto extends PartialType(CreatePatientInDto) {
  @ApiPropertyOptional({ 
    example: 'Juan',
    description: 'Nombre(s) del paciente',
  })
  @IsString({ message: 'El nombre debe ser texto' })
  @IsOptional()
  firstName?: string;

  @ApiPropertyOptional({ 
    example: 'Pérez García',
    description: 'Apellidos del paciente',
  })
  @IsString({ message: 'Los apellidos deben ser texto' })
  @IsOptional()
  lastName?: string;

  @ApiPropertyOptional({ 
    example: '1985-05-15',
    description: 'Fecha de nacimiento en formato YYYY-MM-DD',
  })
  @IsDateString({}, { message: 'La fecha debe tener formato YYYY-MM-DD' })
  @IsOptional()
  birthDate?: string;

  @ApiPropertyOptional({ 
    enum: Gender,
    example: Gender.MASCULINO,
    description: 'Género del paciente',
  })
  @IsEnum(Gender, { message: 'El género debe ser Masculino, Femenino u Otro' })
  @IsOptional()
  gender?: Gender;

  @ApiPropertyOptional({ 
    enum: PatientStatus,
    example: PatientStatus.SEGUIMIENTO,
    description: 'Estado clínico del paciente',
  })
  @IsEnum(PatientStatus, { message: 'El estado debe ser Activo, Seguimiento o Inactivo' })
  @IsOptional()
  status?: PatientStatus;
}