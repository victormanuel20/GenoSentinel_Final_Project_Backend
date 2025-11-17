import { PatientsService } from './patients.service';
import { PatientResponseDto } from './dto/patient-response.dto';
export declare class PatientsController {
    private readonly patientsService;
    constructor(patientsService: PatientsService);
    findAll(): Promise<PatientResponseDto[]>;
}
