import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientResponseDto } from './dto/patient-response.dto';
import { SearchPatientDto } from './dto/search-patient.dto';
import { DesactivatePatientDto } from './dto/DesactivatePatientDto';
export declare class PatientsController {
    private readonly patientsService;
    constructor(patientsService: PatientsService);
    findAll(): Promise<PatientResponseDto[]>;
    search(searchDto: SearchPatientDto): Promise<PatientResponseDto[]>;
    findOne(id: number): Promise<PatientResponseDto>;
    create(createPatientDto: CreatePatientDto): Promise<PatientResponseDto>;
    update(id: number, updatePatientDto: UpdatePatientDto): Promise<PatientResponseDto>;
    desactivate(id: number, deactivatePatientDto: DesactivatePatientDto): Promise<PatientResponseDto>;
}
