import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { PatientResponseDto } from './dto/patient-response.dto';
import { CreatePatientDto } from './dto/create-patient.dto';
export declare class PatientsService {
    private readonly patientRepository;
    constructor(patientRepository: Repository<Patient>);
    findAll(): Promise<PatientResponseDto[]>;
    create(createPatientDto: CreatePatientDto): Promise<PatientResponseDto>;
}
