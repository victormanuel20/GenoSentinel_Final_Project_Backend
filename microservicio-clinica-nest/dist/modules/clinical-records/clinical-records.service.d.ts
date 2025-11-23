import { Repository } from 'typeorm';
import { ClinicalRecord } from './entities/clinical-record.entity';
import { Patient } from '../patients/entities/patient.entity';
import { TumorType } from '../tumor-types/entities/tumor-type.entity';
import { CreateClinicalRecordInDto } from './dto/create-clinical-record-in.dto';
import { ClinicalRecordOutDto } from './dto/clinical-record-out.dto';
import { UpdateClinicalRecordInDto } from './dto/update-clinical-record-in.dto';
export declare class ClinicalRecordsService {
    private readonly clinicalRecordRepository;
    private readonly patientRepository;
    private readonly tumorTypeRepository;
    constructor(clinicalRecordRepository: Repository<ClinicalRecord>, patientRepository: Repository<Patient>, tumorTypeRepository: Repository<TumorType>);
    create(createDto: CreateClinicalRecordInDto): Promise<ClinicalRecordOutDto>;
    findAll(): Promise<ClinicalRecordOutDto[]>;
    findOne(id: number): Promise<ClinicalRecordOutDto>;
    findByPatient(patientId: number): Promise<ClinicalRecordOutDto[]>;
    findByTumorType(tumorTypeId: number): Promise<ClinicalRecordOutDto[]>;
    update(id: number, updateDto: UpdateClinicalRecordInDto): Promise<ClinicalRecordOutDto>;
    private toOutDto;
}
