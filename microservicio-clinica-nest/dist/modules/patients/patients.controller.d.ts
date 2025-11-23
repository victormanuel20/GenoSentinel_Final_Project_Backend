import { PatientsService } from './patients.service';
import { CreatePatientInDto } from './dto/create-patient-in.dto';
import { UpdatePatientInDto } from './dto/update-patient-in.dto';
import { PatientResponseOutDto } from './dto/patient-response-out.dto';
import { SearchPatientInDto } from './dto/search-patient-in.dto';
import { DesactivatePatientInDto } from './dto/DesactivatePatient-in.Dto';
export declare class PatientsController {
    private readonly patientsService;
    constructor(patientsService: PatientsService);
    findAll(): Promise<PatientResponseOutDto[]>;
    search(searchDto: SearchPatientInDto): Promise<PatientResponseOutDto[]>;
    findOne(id: number): Promise<PatientResponseOutDto>;
    create(createPatientDto: CreatePatientInDto): Promise<PatientResponseOutDto>;
    update(id: number, updatePatientDto: UpdatePatientInDto): Promise<PatientResponseOutDto>;
    desactivate(id: number, deactivatePatientDto: DesactivatePatientInDto): Promise<PatientResponseOutDto>;
    remove(id: number): Promise<{
        message: string;
        success: boolean;
    }>;
}
