import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTumorTypeDto {
  @ApiProperty({ 
    example: 'Cáncer de próstata',
    description: 'Nombre del tipo de tumor',
  })
  @IsString({ message: 'El nombre debe ser texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: string;

  @ApiProperty({ 
    example: 'Sistema reproductor masculino',
    description: 'Sistema o región del cuerpo afectada',
  })
  @IsString({ message: 'El sistema afectado debe ser texto' })
  @IsNotEmpty({ message: 'El sistema afectado es obligatorio' })
  systemAffected: string;
}
