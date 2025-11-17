import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientsModule } from './modules/patients/patients.module';
import { TumorTypesModule } from './modules/tumor-types/tumor-types.module';
import { ClinicalRecordsModule } from './modules/clinical-records/clinical-records.module';

@Module({
  imports: [PatientsModule, TumorTypesModule, ClinicalRecordsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
