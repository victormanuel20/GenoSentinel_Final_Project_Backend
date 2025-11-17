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
exports.UpdatePatientDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_patient_dto_1 = require("./create-patient.dto");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const patient_entity_1 = require("../entities/patient.entity");
class UpdatePatientDto extends (0, mapped_types_1.PartialType)(create_patient_dto_1.CreatePatientDto) {
    firstName;
    lastName;
    birthDate;
    gender;
    status;
}
exports.UpdatePatientDto = UpdatePatientDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Juan',
        description: 'Nombre(s) del paciente',
    }),
    (0, class_validator_1.IsString)({ message: 'El nombre debe ser texto' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePatientDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Pérez García',
        description: 'Apellidos del paciente',
    }),
    (0, class_validator_1.IsString)({ message: 'Los apellidos deben ser texto' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePatientDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '1985-05-15',
        description: 'Fecha de nacimiento en formato YYYY-MM-DD',
    }),
    (0, class_validator_1.IsDateString)({}, { message: 'La fecha debe tener formato YYYY-MM-DD' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePatientDto.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: patient_entity_1.Gender,
        example: patient_entity_1.Gender.MASCULINO,
        description: 'Género del paciente',
    }),
    (0, class_validator_1.IsEnum)(patient_entity_1.Gender, { message: 'El género debe ser Masculino, Femenino u Otro' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePatientDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: patient_entity_1.PatientStatus,
        example: patient_entity_1.PatientStatus.SEGUIMIENTO,
        description: 'Estado clínico del paciente',
    }),
    (0, class_validator_1.IsEnum)(patient_entity_1.PatientStatus, { message: 'El estado debe ser Activo, Seguimiento o Inactivo' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePatientDto.prototype, "status", void 0);
//# sourceMappingURL=update-patient.dto.js.map