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
const swagger_1 = require("@nestjs/swagger");
const clinical_records_service_1 = require("./clinical-records.service");
const create_clinical_record_in_dto_1 = require("./dto/create-clinical-record-in.dto");
const clinical_record_out_dto_1 = require("./dto/clinical-record-out.dto");
const update_clinical_record_in_dto_1 = require("./dto/update-clinical-record-in.dto");
let ClinicalRecordsController = class ClinicalRecordsController {
    clinicalRecordsService;
    constructor(clinicalRecordsService) {
        this.clinicalRecordsService = clinicalRecordsService;
    }
    async create(createDto) {
        return await this.clinicalRecordsService.create(createDto);
    }
    async findAll() {
        return await this.clinicalRecordsService.findAll();
    }
    async findByPatient(patientId) {
        return await this.clinicalRecordsService.findByPatient(patientId);
    }
    async findByTumorType(tumorTypeId) {
        return await this.clinicalRecordsService.findByTumorType(tumorTypeId);
    }
    async findOne(id) {
        return await this.clinicalRecordsService.findOne(id);
    }
    async update(id, updateDto) {
        return await this.clinicalRecordsService.update(id, updateDto);
    }
};
exports.ClinicalRecordsController = ClinicalRecordsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Crear una nueva historia clínica' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Historia clínica creada exitosamente',
        type: clinical_record_out_dto_1.ClinicalRecordOutDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos inválidos',
        schema: {
            example: {
                statusCode: 400,
                message: ['El ID del paciente es obligatorio'],
                error: 'Bad Request'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Paciente o tipo de tumor no encontrado',
        schema: {
            example: {
                statusCode: 404,
                message: 'No se puede crear la historia clínica: el paciente con ID 999 no existe',
                error: 'Not Found'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Ya existe una historia clínica idéntica',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_clinical_record_in_dto_1.CreateClinicalRecordInDto]),
    __metadata("design:returntype", Promise)
], ClinicalRecordsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todas las historias clínicas' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de historias clínicas',
        type: [clinical_record_out_dto_1.ClinicalRecordOutDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClinicalRecordsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('patient/:patientId'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todas las historias clínicas de un paciente' }),
    (0, swagger_1.ApiParam)({ name: 'patientId', description: 'ID del paciente', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Historias clínicas del paciente', type: [clinical_record_out_dto_1.ClinicalRecordOutDto] }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Paciente no encontrado o sin historias clínicas' }),
    __param(0, (0, common_1.Param)('patientId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClinicalRecordsController.prototype, "findByPatient", null);
__decorate([
    (0, common_1.Get)('tumor-type/:tumorTypeId'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todas las historias clínicas de un tipo de tumor' }),
    (0, swagger_1.ApiParam)({ name: 'tumorTypeId', description: 'ID del tipo de tumor', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Historias clínicas del tipo de tumor', type: [clinical_record_out_dto_1.ClinicalRecordOutDto] }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tipo de tumor no encontrado o sin historias clínicas' }),
    __param(0, (0, common_1.Param)('tumorTypeId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClinicalRecordsController.prototype, "findByTumorType", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener una historia clínica por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la historia clínica', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Historia clínica encontrada',
        type: clinical_record_out_dto_1.ClinicalRecordOutDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Historia clínica no encontrada',
        schema: {
            example: {
                statusCode: 404,
                message: 'Historia clínica con ID 999 no encontrada',
                error: 'Not Found'
            }
        }
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClinicalRecordsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar la evolución de una historia clínica (stage y/o tratamiento)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la historia clínica', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Historia clínica actualizada exitosamente',
        type: clinical_record_out_dto_1.ClinicalRecordOutDto,
        schema: {
            example: {
                id: 1,
                patientId: 1,
                tumorTypeId: 1,
                diagnosisDate: '2023-01-15',
                stage: 'III',
                treatmentProtocol: 'Quimioterapia de segunda línea',
                patient: {
                    id: 1,
                    fullName: 'Ana García López',
                    gender: 'Femenino',
                    status: 'Activo'
                },
                tumorType: {
                    id: 1,
                    name: 'Cáncer de mama',
                    systemAffected: 'Glándulas'
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos inválidos o sin campos para actualizar',
        schema: {
            examples: {
                noFields: {
                    value: {
                        statusCode: 400,
                        message: 'Debe proporcionar al menos un campo para actualizar (stage o treatmentProtocol)',
                        error: 'Bad Request'
                    }
                },
                emptyFields: {
                    value: {
                        statusCode: 400,
                        message: ['La etapa debe ser texto'],
                        error: 'Bad Request'
                    }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Historia clínica no encontrada',
        schema: {
            example: {
                statusCode: 404,
                message: 'Historia clínica con ID 999 no encontrada',
                error: 'Not Found'
            }
        }
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_clinical_record_in_dto_1.UpdateClinicalRecordInDto]),
    __metadata("design:returntype", Promise)
], ClinicalRecordsController.prototype, "update", null);
exports.ClinicalRecordsController = ClinicalRecordsController = __decorate([
    (0, swagger_1.ApiTags)('Historias clinicas'),
    (0, common_1.Controller)('clinical-records'),
    __metadata("design:paramtypes", [clinical_records_service_1.ClinicalRecordsService])
], ClinicalRecordsController);
//# sourceMappingURL=clinical-records.controller.js.map