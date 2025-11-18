import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TumorTypesService } from './tumor-types.service';
import { TumorTypesController } from './tumor-types.controller';
import { TumorType } from './entities/tumor-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TumorType]), // ← Registrar entidad
  ],
  controllers: [TumorTypesController],
  providers: [TumorTypesService],
  exports: [TumorTypesService], // ← Para usar en otros módulos
})
export class TumorTypesModule {}