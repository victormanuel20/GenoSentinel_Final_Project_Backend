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
exports.ClinicalRecordsController = void 0;
const common_1 = require("@nestjs/common");
const clinical_records_service_1 = require("./clinical-records.service");
const create_clinical_record_dto_1 = require("./dto/create-clinical-record.dto");
const update_clinical_record_dto_1 = require("./dto/update-clinical-record.dto");
let ClinicalRecordsController = class ClinicalRecordsController {
    clinicalRecordsService;
    constructor(clinicalRecordsService) {
        this.clinicalRecordsService = clinicalRecordsService;
    }
    create(createClinicalRecordDto) {
        return this.clinicalRecordsService.create(createClinicalRecordDto);
    }
    findAll() {
        return this.clinicalRecordsService.findAll();
    }
    findOne(id) {
        return this.clinicalRecordsService.findOne(+id);
    }
    update(id, updateClinicalRecordDto) {
        return this.clinicalRecordsService.update(+id, updateClinicalRecordDto);
    }
    remove(id) {
        return this.clinicalRecordsService.remove(+id);
    }
};
exports.ClinicalRecordsController = ClinicalRecordsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_clinical_record_dto_1.CreateClinicalRecordDto]),
    __metadata("design:returntype", void 0)
], ClinicalRecordsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClinicalRecordsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClinicalRecordsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_clinical_record_dto_1.UpdateClinicalRecordDto]),
    __metadata("design:returntype", void 0)
], ClinicalRecordsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClinicalRecordsController.prototype, "remove", null);
exports.ClinicalRecordsController = ClinicalRecordsController = __decorate([
    (0, common_1.Controller)('clinical-records'),
    __metadata("design:paramtypes", [clinical_records_service_1.ClinicalRecordsService])
], ClinicalRecordsController);
//# sourceMappingURL=clinical-records.controller.js.map