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
            // Usar variables de entorno (Kubernetes las inyectará)
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '3306'),
            username: process.env.DB_USERNAME || 'root',
            password: process.env.DB_PASSWORD || '123456',
            database: process.env.DB_DATABASE || 'genosentinel',
            autoLoadEntities: true,
            synchronize: false,
            logging: true,
        }),
        PatientsModule,
        TumorTypesModule,
        ClinicalRecordsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
