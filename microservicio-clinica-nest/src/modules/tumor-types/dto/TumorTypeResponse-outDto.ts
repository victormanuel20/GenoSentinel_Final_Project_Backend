import { ApiProperty } from '@nestjs/swagger';

export class TumorTypeResponseOutDto {
  @ApiProperty({ example: 1, description: 'ID del tipo de tumor' })
  id: number;

  @ApiProperty({ example: 'Cáncer de mama', description: 'Nombre del tipo de tumor' })
  name: string;

  @ApiProperty({ example: 'Glándulas', description: 'Sistema afectado' })
  systemAffected: string;
}