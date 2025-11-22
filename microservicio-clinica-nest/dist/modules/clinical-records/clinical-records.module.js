"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClinicalRecordsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const clinical_records_service_1 = require("./clinical-records.service");
const clinical_records_controller_1 = require("./clinical-records.controller");
const clinical_record_entity_1 = require("./entities/clinical-record.entity");
const patient_entity_1 = require("../patients/entities/patient.entity");
const tumor_type_entity_1 = require("../tumor-types/entities/tumor-type.entity");
let ClinicalRecordsModule = class ClinicalRecordsModule {
};
exports.ClinicalRecordsModule = ClinicalRecordsModule;
exports.ClinicalRecordsModule = ClinicalRecordsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                clinical_record_entity_1.ClinicalRecord,
                patient_entity_1.Patient,
                tumor_type_entity_1.TumorType,
            ]),
        ],
        controllers: [clinical_records_controller_1.ClinicalRecordsController],
        providers: [clinical_records_service_1.ClinicalRecordsService],
        exports: [clinical_records_service_1.ClinicalRecordsService],
    })
], ClinicalRecordsModule);
//# sourceMappingURL=clinical-records.module.js.map