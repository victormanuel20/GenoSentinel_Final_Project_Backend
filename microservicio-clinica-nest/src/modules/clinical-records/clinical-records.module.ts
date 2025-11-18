import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicalRecordsService } from './clinical-records.service';
import { ClinicalRecordsController } from './clinical-records.controller';
import { ClinicalRecord } from './entities/clinical-record.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClinicalRecord]), // ← Registrar entidad
  ],
  controllers: [ClinicalRecordsController],
  providers: [ClinicalRecordsService],
  exports: [ClinicalRecordsService], // ← Para usar en otros módulos
})
export class ClinicalRecordsModule {}