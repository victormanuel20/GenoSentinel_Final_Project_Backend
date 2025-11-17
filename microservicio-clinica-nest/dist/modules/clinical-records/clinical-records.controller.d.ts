import { ClinicalRecordsService } from './clinical-records.service';
import { CreateClinicalRecordDto } from './dto/create-clinical-record.dto';
import { UpdateClinicalRecordDto } from './dto/update-clinical-record.dto';
export declare class ClinicalRecordsController {
    private readonly clinicalRecordsService;
    constructor(clinicalRecordsService: ClinicalRecordsService);
    create(createClinicalRecordDto: CreateClinicalRecordDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateClinicalRecordDto: UpdateClinicalRecordDto): string;
    remove(id: string): string;
}
