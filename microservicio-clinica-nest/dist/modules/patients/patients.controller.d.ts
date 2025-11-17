import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
export declare class PatientsController {
    private readonly patientsService;
    constructor(patientsService: PatientsService);
    create(createPatientDto: CreatePatientDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePatientDto: UpdatePatientDto): string;
    remove(id: string): string;
}
