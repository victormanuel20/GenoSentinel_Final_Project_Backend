import { IsString, IsNotEmpty, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum Gender {
  MASCULINO = 'Masculino',
  FEMENINO = 'Femenino',
  OTRO = 'Otro',
}

export enum PatientStatus {
  ACTIVO = 'Activo',
  SEGUIMIENTO = 'Seguimiento',
  INACTIVO = 'Inactivo',
}

export class CreatePatientDto {
  @ApiProperty({ 
    example: 'Juan',
    description: 'Nombre(s) del paciente',
  })
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  firstName: string;

  @ApiProperty({ 
    example: 'Pérez García',
    description: 'Apellidos del paciente',
  })
  @IsString({ message: 'Los apellidos deben ser texto' })
  @IsNotEmpty({ message: 'Los apellidos son obligatorios' })
  lastName: string;

  @ApiProperty({ 
    example: '1985-05-15',
    description: 'Fecha de nacimiento en formato YYYY-MM-DD',
  })
  @IsDateString({}, { message: 'La fecha debe tener formato YYYY-MM-DD' })
  @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
  birthDate: string;

  @ApiProperty({ 
    enum: Gender,
    example: Gender.MASCULINO,
    description: 'Género del paciente',
  })
  @IsEnum(Gender, { message: 'El género debe ser Masculino, Femenino u Otro' })
  @IsNotEmpty({ message: 'El género es obligatorio' })
  gender: Gender;

  @ApiProperty({ 
    enum: PatientStatus,
    example: PatientStatus.ACTIVO,
    description: 'Estado clínico del paciente',
    default: PatientStatus.ACTIVO,
  })
  @IsEnum(PatientStatus, { message: 'El estado debe ser Activo, Seguimiento o Inactivo' })
  status: PatientStatus = PatientStatus.ACTIVO;
}