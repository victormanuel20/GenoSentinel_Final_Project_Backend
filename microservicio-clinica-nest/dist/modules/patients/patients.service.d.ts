import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { PatientResponseOutDto } from './dto/patient-response-out.dto';
import { CreatePatientInDto } from './dto/create-patient-in.dto';
import { SearchPatientInDto } from './dto/search-patient-in.dto';
import { UpdatePatientInDto } from './dto/update-patient-in.dto';
import { DesactivatePatientInDto } from './dto/DesactivatePatient-in.Dto';
export declare class PatientsService {
    private readonly patientRepository;
    constructor(patientRepository: Repository<Patient>);
    findAll(): Promise<PatientResponseOutDto[]>;
    findOne(id: number): Promise<PatientResponseOutDto>;
    search(searchDto: SearchPatientInDto): Promise<PatientResponseOutDto[]>;
    create(createPatientDto: CreatePatientInDto): Promise<PatientResponseOutDto>;
    private toResponseDto;
    update(id: number, updatePatientDto: UpdatePatientInDto): Promise<PatientResponseOutDto>;
    desactivate(id: number, deactivatePatientDto: DesactivatePatientInDto): Promise<PatientResponseOutDto>;
}
