import { ApiProperty } from '@nestjs/swagger';

export class PatientResponseDto {
  @ApiProperty({ 
    example: 1, 
    description: 'ID único del paciente' 
  })
  id: number;

  @ApiProperty({ 
    example: 'Ana', 
    description: 'Nombre(s) del paciente' 
  })
  firstName: string;

  @ApiProperty({ 
    example: 'García López', 
    description: 'Apellidos del paciente' 
  })
  lastName: string;

  @ApiProperty({ 
    example: '1990-05-10', 
    description: 'Fecha de nacimiento' 
  })
  birthDate: Date;

  @ApiProperty({ 
    example: 'Femenino', 
    description: 'Género del paciente' 
  })
  gender: string;

  @ApiProperty({ 
    example: 'Activo', 
    description: 'Estado clínico actual' 
  })
  status: string;
}