import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientsModule } from './modules/patients/patients.module';
import { TumorTypesModule } from './modules/tumor-types/tumor-types.module';
import { ClinicalRecordsModule } from './modules/clinical-records/clinical-records.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'genosentinel',
      autoLoadEntities: true, // carga automática de entidades
      synchronize: false,     // IMPORTANTE: ahora te explico esto
      
      logging: true, // ✅ AGREGAR ESTO para ver las queries SQL
    }),
    PatientsModule,
    TumorTypesModule,
    ClinicalRecordsModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
