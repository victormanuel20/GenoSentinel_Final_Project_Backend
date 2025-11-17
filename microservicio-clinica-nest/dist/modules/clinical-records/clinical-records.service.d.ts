import { CreateClinicalRecordDto } from './dto/create-clinical-record.dto';
import { UpdateClinicalRecordDto } from './dto/update-clinical-record.dto';
export declare class ClinicalRecordsService {
    create(createClinicalRecordDto: CreateClinicalRecordDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateClinicalRecordDto: UpdateClinicalRecordDto): string;
    remove(id: number): string;
}
