import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PatientResponseDto } from './dto/patient-response.dto';
export declare class PatientsController {
    private readonly patientsService;
    constructor(patientsService: PatientsService);
    findAll(): Promise<PatientResponseDto[]>;
    create(createPatientDto: CreatePatientDto): Promise<PatientResponseDto>;
}
