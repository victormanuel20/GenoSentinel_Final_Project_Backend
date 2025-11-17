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
exports.Patient = exports.PatientStatus = exports.Gender = void 0;
const typeorm_1 = require("typeorm");
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
let Patient = class Patient {
    id;
    firstName;
    lastName;
    birthDate;
    gender;
    status;
};
exports.Patient = Patient;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Patient.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'first_name', length: 100 }),
    __metadata("design:type", String)
], Patient.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_name', length: 100 }),
    __metadata("design:type", String)
], Patient.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'birth_date', type: 'date' }),
    __metadata("design:type", String)
], Patient.prototype, "birthDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: Gender,
    }),
    __metadata("design:type", String)
], Patient.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PatientStatus,
        default: PatientStatus.ACTIVO,
    }),
    __metadata("design:type", String)
], Patient.prototype, "status", void 0);
exports.Patient = Patient = __decorate([
    (0, typeorm_1.Entity)('patient')
], Patient);
//# sourceMappingURL=patient.entity.js.map