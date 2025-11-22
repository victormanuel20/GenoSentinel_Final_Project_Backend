import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicalRecordsService } from './clinical-records.service';
import { ClinicalRecordsController } from './clinical-records.controller';
import { ClinicalRecord } from './entities/clinical-record.entity';
import { Patient } from '../patients/entities/patient.entity';  // ← Importar
import { TumorType } from '../tumor-types/entities/tumor-type.entity';  // ← Importar

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClinicalRecord,  // ← Entidad propia
      Patient,         // ← Entidad de otro módulo
      TumorType,       // ← Entidad de otro módulo
    ]),
  ],
  controllers: [ClinicalRecordsController],
  providers: [ClinicalRecordsService],
  exports: [ClinicalRecordsService],
})
export class ClinicalRecordsModule {}