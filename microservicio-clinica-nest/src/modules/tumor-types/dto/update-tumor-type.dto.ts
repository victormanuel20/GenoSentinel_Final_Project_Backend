import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateTumorTypeDto } from './create-tumor-type.dto';


export class UpdateTumorTypeDto extends PartialType(CreateTumorTypeDto) {

    @ApiPropertyOptional({ 
    example: 'Cáncer de mama invasivo',
    description: 'Nombre del tipo de tumor (opcional)',
  })
  @IsString({ message: 'El nombre debe ser texto' })
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ 
    example: 'Glándulas mamarias',
    description: 'Sistema o región del cuerpo afectada (opcional)',
  })
  @IsString({ message: 'El sistema afectado debe ser texto' })
  @IsOptional()
  systemAffected?: string;

}
