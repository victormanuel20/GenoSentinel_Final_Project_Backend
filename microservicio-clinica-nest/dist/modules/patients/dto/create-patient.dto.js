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
exports.CreatePatientDto = exports.PatientStatus = exports.Gender = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var Gender;
(function (Gender) {
    Gender["MASCULINO"] = "Masculino";
    Gender["FEMENINO"] = "Femenino";
    Gender["OTRO"] = "Otro";
})(Gender || (exports.Gender = Gender = {}));
var PatientStatus;
(function (PatientStatus) {
    PatientStatus["ACTIVO"] = "Activo";
    PatientStatus["SEGUIMIENTO"] = "Seguimiento";
    PatientStatus["INACTIVO"] = "Inactivo";
})(PatientStatus || (exports.PatientStatus = PatientStatus = {}));
class CreatePatientDto {
    firstName;
    lastName;
    birthDate;
    gender;
    status = PatientStatus.ACTIVO;
}
exports.CreatePatientDto = CreatePatientDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Juan',
        description: 'Nombre(s) del paciente',
    }),
    (0, class_validator_1.IsString)({ message: 'El nombre debe ser un texto' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre es obligatorio' }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Pérez García',
        description: 'Apellidos del paciente',
    }),
    (0, class_validator_1.IsString)({ message: 'Los apellidos deben ser texto' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Los apellidos son obligatorios' }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '1985-05-15',
        description: 'Fecha de nacimiento en formato YYYY-MM-DD',
    }),
    (0, class_validator_1.IsDateString)({}, { message: 'La fecha debe tener formato YYYY-MM-DD' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La fecha de nacimiento es obligatoria' }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: Gender,
        example: Gender.MASCULINO,
        description: 'Género del paciente',
    }),
    (0, class_validator_1.IsEnum)(Gender, { message: 'El género debe ser Masculino, Femenino u Otro' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El género es obligatorio' }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: PatientStatus,
        example: PatientStatus.ACTIVO,
        description: 'Estado clínico del paciente',
        default: PatientStatus.ACTIVO,
    }),
    (0, class_validator_1.IsEnum)(PatientStatus, { message: 'El estado debe ser Activo, Seguimiento o Inactivo' }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "status", void 0);
//# sourceMappingURL=create-patient.dto.js.map