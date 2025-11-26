import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';


export class UpdateClinicalRecordInDto  {

 @ApiPropertyOptional({ 
    example: 'III',
    description: 'Nueva etapa del cáncer (ej: IIA, III, IV)',
  })
  @IsString({ message: 'La etapa debe ser texto' })
  @IsOptional()
  stage?: string;

  @ApiPropertyOptional({ 
    example: 'Quimioterapia de segunda línea + inmunoterapia',
    description: 'Nuevo protocolo de tratamiento',
  })
  @IsString({ message: 'El protocolo de tratamiento debe ser texto' })
  @IsOptional()
  treatmentProtocol?: string;


}
