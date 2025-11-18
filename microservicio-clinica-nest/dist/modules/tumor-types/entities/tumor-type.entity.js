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
exports.TumorType = void 0;
const typeorm_1 = require("typeorm");
const clinical_record_entity_1 = require("../../clinical-records/entities/clinical-record.entity");
let TumorType = class TumorType {
    id;
    name;
    systemAffected;
    clinicalRecords;
};
exports.TumorType = TumorType;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], TumorType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150 }),
    __metadata("design:type", String)
], TumorType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'system_affected', type: 'varchar', length: 150 }),
    __metadata("design:type", String)
], TumorType.prototype, "systemAffected", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => clinical_record_entity_1.ClinicalRecord, (clinicalRecord) => clinicalRecord.tumorType),
    __metadata("design:type", Array)
], TumorType.prototype, "clinicalRecords", void 0);
exports.TumorType = TumorType = __decorate([
    (0, typeorm_1.Entity)('tumor_type')
], TumorType);
//# sourceMappingURL=tumor-type.entity.js.map