import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { PatientResponseDto } from './dto/patient-response.dto';
import { CreatePatientDto } from './dto/create-patient.dto';
import { SearchPatientDto } from './dto/search-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
export declare class PatientsService {
    private readonly patientRepository;
    constructor(patientRepository: Repository<Patient>);
    findAll(): Promise<PatientResponseDto[]>;
    findOne(id: number): Promise<PatientResponseDto>;
    search(searchDto: SearchPatientDto): Promise<PatientResponseDto[]>;
    create(createPatientDto: CreatePatientDto): Promise<PatientResponseDto>;
    private toResponseDto;
    update(id: number, updatePatientDto: UpdatePatientDto): Promise<PatientResponseDto>;
}
