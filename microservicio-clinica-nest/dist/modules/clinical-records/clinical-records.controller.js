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
    async findOne(id) {
        return await this.clinicalRecordsService.findOne(id);
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
exports.ClinicalRecordsController = ClinicalRecordsController = __decorate([
    (0, swagger_1.ApiTags)('Historias clinicas'),
    (0, common_1.Controller)('clinical-records'),
    __metadata("design:paramtypes", [clinical_records_service_1.ClinicalRecordsService])
], ClinicalRecordsController);
//# sourceMappingURL=clinical-records.controller.js.map