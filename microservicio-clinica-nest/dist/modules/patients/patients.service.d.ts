import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { PatientResponseDto } from './dto/patient-response.dto';
export declare class PatientsService {
    private readonly patientRepository;
    constructor(patientRepository: Repository<Patient>);
    findAll(): Promise<PatientResponseDto[]>;
}
