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
exports.PatientsController = void 0;
const common_1 = require("@nestjs/common");
const patients_service_1 = require("./patients.service");
const create_patient_dto_1 = require("./dto/create-patient.dto");
const patient_response_dto_1 = require("./dto/patient-response.dto");
const swagger_1 = require("@nestjs/swagger");
let PatientsController = class PatientsController {
    patientsService;
    constructor(patientsService) {
        this.patientsService = patientsService;
    }
    async findAll() {
        return await this.patientsService.findAll();
    }
    async create(createPatientDto) {
        return await this.patientsService.create(createPatientDto);
    }
};
exports.PatientsController = PatientsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los pacientes' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de pacientes obtenida exitosamente',
        type: [patient_response_dto_1.PatientResponseDto]
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PatientsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo paciente' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Paciente creado exitosamente',
        type: patient_response_dto_1.PatientResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos inválidos (validación de campos)',
        schema: {
            example: {
                statusCode: 400,
                message: ['El nombre es obligatorio'],
                error: 'Bad Request'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'El paciente ya existe (duplicado)',
        schema: {
            example: {
                statusCode: 409,
                message: 'Ya existe un paciente con el nombre Ana García López y fecha de nacimiento 1990-05-10',
                error: 'Conflict'
            }
        }
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_patient_dto_1.CreatePatientDto]),
    __metadata("design:returntype", Promise)
], PatientsController.prototype, "create", null);
exports.PatientsController = PatientsController = __decorate([
    (0, swagger_1.ApiTags)('Pacientes'),
    (0, common_1.Controller)('patients'),
    __metadata("design:paramtypes", [patients_service_1.PatientsService])
], PatientsController);
//# sourceMappingURL=patients.controller.js.map