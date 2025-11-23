import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientResponseOutDto } from './dto/patient-response-out.dto';
import { SearchPatientDto } from './dto/search-patient.dto';
import { DesactivatePatientDto } from './dto/DesactivatePatientDto';
export declare class PatientsController {
    private readonly patientsService;
    constructor(patientsService: PatientsService);
    findAll(): Promise<PatientResponseOutDto[]>;
    search(searchDto: SearchPatientDto): Promise<PatientResponseOutDto[]>;
    findOne(id: number): Promise<PatientResponseOutDto>;
    create(createPatientDto: CreatePatientDto): Promise<PatientResponseOutDto>;
    update(id: number, updatePatientDto: UpdatePatientDto): Promise<PatientResponseOutDto>;
    desactivate(id: number, deactivatePatientDto: DesactivatePatientDto): Promise<PatientResponseOutDto>;
}
