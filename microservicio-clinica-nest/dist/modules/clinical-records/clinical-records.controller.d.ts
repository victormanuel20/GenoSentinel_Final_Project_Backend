import { ClinicalRecordsService } from './clinical-records.service';
import { CreateClinicalRecordInDto } from './dto/create-clinical-record-in.dto';
import { ClinicalRecordOutDto } from './dto/clinical-record-out.dto';
import { UpdateClinicalRecordInDto } from './dto/update-clinical-record-in.dto';
export declare class ClinicalRecordsController {
    private readonly clinicalRecordsService;
    constructor(clinicalRecordsService: ClinicalRecordsService);
    create(createDto: CreateClinicalRecordInDto): Promise<ClinicalRecordOutDto>;
    findAll(): Promise<ClinicalRecordOutDto[]>;
    findByPatient(patientId: number): Promise<ClinicalRecordOutDto[]>;
    findByTumorType(tumorTypeId: number): Promise<ClinicalRecordOutDto[]>;
    findOne(id: number): Promise<ClinicalRecordOutDto>;
    update(id: number, updateDto: UpdateClinicalRecordInDto): Promise<ClinicalRecordOutDto>;
}
