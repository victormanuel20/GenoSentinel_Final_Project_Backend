import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
export declare class PatientsService {
    create(createPatientDto: CreatePatientDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePatientDto: UpdatePatientDto): string;
    remove(id: number): string;
}
