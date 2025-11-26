"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClinicalRecordsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const clinical_record_entity_1 = require("./entities/clinical-record.entity");
const patient_entity_1 = require("../patients/entities/patient.entity");
const tumor_type_entity_1 = require("../tumor-types/entities/tumor-type.entity");
const clinical_record_not_found_exception_1 = require("./exceptions/clinical-record-not-found.exception");
const patient_not_found_for_record_exception_1 = require("./exceptions/patient-not-found-for-record.exception");
const tumor_type_not_found_for_record_exception_1 = require("./exceptions/tumor-type-not-found-for-record.exception");
const duplicate_clinical_record_exception_1 = require("./exceptions/duplicate-clinical-record.exception");
const no_records_found_for_patient_exception_1 = require("./exceptions/no-records-found-for-patient.exception");
const no_records_found_for_tumor_type_exception_1 = require("./exceptions/no-records-found-for-tumor-type.exception");
const no_fields_to_update_exception_1 = require("./exceptions/no-fields-to-update.exception");
let ClinicalRecordsService = class ClinicalRecordsService {
    clinicalRecordRepository;
    patientRepository;
    tumorTypeRepository;
    constructor(clinicalRecordRepository, patientRepository, tumorTypeRepository) {
        this.clinicalRecordRepository = clinicalRecordRepository;
        this.patientRepository = patientRepository;
        this.tumorTypeRepository = tumorTypeRepository;
    }
    async create(createDto) {
        const patient = await this.patientRepository.findOne({
            where: { id: createDto.patientId },
        });
        if (!patient) {
            throw new patient_not_found_for_record_exception_1.PatientNotFoundForRecordException(createDto.patientId);
        }
        const tumorType = await this.tumorTypeRepository.findOne({
            where: { id: createDto.tumorTypeId },
        });
        if (!tumorType) {
            throw new tumor_type_not_found_for_record_exception_1.TumorTypeNotFoundForRecordException(createDto.tumorTypeId);
        }
        const existingRecord = await this.clinicalRecordRepository.findOne({
            where: {
                patientId: createDto.patientId,
                tumorTypeId: createDto.tumorTypeId,
                diagnosisDate: createDto.diagnosisDate,
            },
        });
        if (existingRecord) {
            throw new duplicate_clinical_record_exception_1.DuplicateClinicalRecordException(createDto.patientId, createDto.tumorTypeId, createDto.diagnosisDate);
        }
        const clinicalRecord = this.clinicalRecordRepository.create({
            patientId: createDto.patientId,
            tumorTypeId: createDto.tumorTypeId,
            diagnosisDate: createDto.diagnosisDate,
            stage: createDto.stage,
            treatmentProtocol: createDto.treatmentProtocol,
        });
        const savedRecord = await this.clinicalRecordRepository.save(clinicalRecord);
        const recordWithRelations = await this.clinicalRecordRepository.findOne({
            where: { id: savedRecord.id },
            relations: ['patient', 'tumorType'],
        });
        return this.toOutDto(recordWithRelations);
    }
    async findAll() {
        const records = await this.clinicalRecordRepository.find({
            relations: ['patient', 'tumorType'],
        });
        return records.map(record => this.toOutDto(record));
    }
    async findOne(id) {
        const record = await this.clinicalRecordRepository.findOne({
            where: { id },
            relations: ['patient', 'tumorType'],
        });
        if (!record) {
            throw new clinical_record_not_found_exception_1.ClinicalRecordNotFoundException(id);
        }
        return this.toOutDto(record);
    }
    async findByPatient(patientId) {
        const patient = await this.patientRepository.findOne({
            where: { id: patientId },
        });
        if (!patient) {
            throw new patient_not_found_for_record_exception_1.PatientNotFoundForRecordException(patientId);
        }
        const records = await this.clinicalRecordRepository.find({
            where: { patientId },
            relations: ['patient', 'tumorType'],
            order: { diagnosisDate: 'DESC' },
        });
        if (!records || records.length === 0) {
            throw new no_records_found_for_patient_exception_1.NoRecordsFoundForPatientException(patientId);
        }
        return records.map(record => this.toOutDto(record));
    }
    async findByTumorType(tumorTypeId) {
        const tumorType = await this.tumorTypeRepository.findOne({
            where: { id: tumorTypeId },
        });
        if (!tumorType) {
            throw new tumor_type_not_found_for_record_exception_1.TumorTypeNotFoundForRecordException(tumorTypeId);
        }
        const records = await this.clinicalRecordRepository.find({
            where: { tumorTypeId },
            relations: ['patient', 'tumorType'],
            order: { diagnosisDate: 'DESC' },
        });
        if (!records || records.length === 0) {
            throw new no_records_found_for_tumor_type_exception_1.NoRecordsFoundForTumorTypeException(tumorTypeId);
        }
        return records.map(record => this.toOutDto(record));
    }
    async update(id, updateDto) {
        const existingRecord = await this.clinicalRecordRepository.findOne({
            where: { id },
        });
        if (!existingRecord) {
            throw new clinical_record_not_found_exception_1.ClinicalRecordNotFoundException(id);
        }
        const updateData = {};
        if (updateDto.stage !== undefined && updateDto.stage.trim() !== '') {
            updateData.stage = updateDto.stage.trim();
        }
        if (updateDto.treatmentProtocol !== undefined && updateDto.treatmentProtocol.trim() !== '') {
            updateData.treatmentProtocol = updateDto.treatmentProtocol.trim();
        }
        if (Object.keys(updateData).length === 0) {
            throw new no_fields_to_update_exception_1.NoFieldsToUpdateException();
        }
        await this.clinicalRecordRepository.update(id, updateData);
        const updatedRecord = await this.clinicalRecordRepository.findOne({
            where: { id },
            relations: ['patient', 'tumorType'],
        });
        if (!updatedRecord) {
            throw new clinical_record_not_found_exception_1.ClinicalRecordNotFoundException(id);
        }
        return this.toOutDto(updatedRecord);
    }
    toOutDto(record) {
        return {
            id: record.id,
            patientId: record.patientId,
            tumorTypeId: record.tumorTypeId,
            diagnosisDate: record.diagnosisDate,
            stage: record.stage || undefined,
            treatmentProtocol: record.treatmentProtocol || undefined,
            patient: {
                id: record.patient.id,
                fullName: `${record.patient.firstName} ${record.patient.lastName}`,
                gender: record.patient.gender,
                status: record.patient.status,
            },
            tumorType: {
                id: record.tumorType.id,
                name: record.tumorType.name,
                systemAffected: record.tumorType.systemAffected,
            },
        };
    }
};
exports.ClinicalRecordsService = ClinicalRecordsService;
exports.ClinicalRecordsService = ClinicalRecordsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(clinical_record_entity_1.ClinicalRecord)),
    __param(1, (0, typeorm_1.InjectRepository)(patient_entity_1.Patient)),
    __param(2, (0, typeorm_1.InjectRepository)(tumor_type_entity_1.TumorType)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ClinicalRecordsService);
//# sourceMappingURL=clinical-records.service.js.map