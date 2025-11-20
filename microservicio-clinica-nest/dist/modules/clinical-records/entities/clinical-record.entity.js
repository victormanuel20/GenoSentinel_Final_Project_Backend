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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClinicalRecord = void 0;
const typeorm_1 = require("typeorm");
const patient_entity_1 = require("../../patients/entities/patient.entity");
const tumor_type_entity_1 = require("../../tumor-types/entities/tumor-type.entity");
let ClinicalRecord = class ClinicalRecord {
    id;
    patientId;
    tumorTypeId;
    diagnosisDate;
    stage;
    treatmentProtocol;
    patient;
    tumorType;
};
exports.ClinicalRecord = ClinicalRecord;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], ClinicalRecord.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'patient_id', type: 'bigint' }),
    __metadata("design:type", Number)
], ClinicalRecord.prototype, "patientId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tumor_type_id', type: 'bigint' }),
    __metadata("design:type", Number)
], ClinicalRecord.prototype, "tumorTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'diagnosis_date', type: 'date' }),
    __metadata("design:type", String)
], ClinicalRecord.prototype, "diagnosisDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], ClinicalRecord.prototype, "stage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'treatment_protocol', type: 'text', nullable: true }),
    __metadata("design:type", String)
], ClinicalRecord.prototype, "treatmentProtocol", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => patient_entity_1.Patient, (patient) => patient.clinicalRecords, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'patient_id' }),
    __metadata("design:type", patient_entity_1.Patient)
], ClinicalRecord.prototype, "patient", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tumor_type_entity_1.TumorType, (tumorType) => tumorType.clinicalRecords, {
        onDelete: 'RESTRICT',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'tumor_type_id' }),
    __metadata("design:type", tumor_type_entity_1.TumorType)
], ClinicalRecord.prototype, "tumorType", void 0);
exports.ClinicalRecord = ClinicalRecord = __decorate([
    (0, typeorm_1.Entity)('clinical_record')
], ClinicalRecord);
//# sourceMappingURL=clinical-record.entity.js.map