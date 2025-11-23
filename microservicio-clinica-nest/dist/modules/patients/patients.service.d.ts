import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { PatientResponseOutDto } from './dto/patient-response-out.dto';
import { CreatePatientDto } from './dto/create-patient.dto';
import { SearchPatientDto } from './dto/search-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { DesactivatePatientDto } from './dto/DesactivatePatientDto';
export declare class PatientsService {
    private readonly patientRepository;
    constructor(patientRepository: Repository<Patient>);
    findAll(): Promise<PatientResponseOutDto[]>;
    findOne(id: number): Promise<PatientResponseOutDto>;
    search(searchDto: SearchPatientDto): Promise<PatientResponseOutDto[]>;
    create(createPatientDto: CreatePatientDto): Promise<PatientResponseOutDto>;
    private toResponseDto;
    update(id: number, updatePatientDto: UpdatePatientDto): Promise<PatientResponseOutDto>;
    desactivate(id: number, deactivatePatientDto: DesactivatePatientDto): Promise<PatientResponseOutDto>;
}
