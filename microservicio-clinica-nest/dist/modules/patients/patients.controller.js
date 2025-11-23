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
const create_patient_in_dto_1 = require("./dto/create-patient-in.dto");
const update_patient_in_dto_1 = require("./dto/update-patient-in.dto");
const patient_response_out_dto_1 = require("./dto/patient-response-out.dto");
const search_patient_in_dto_1 = require("./dto/search-patient-in.dto");
const swagger_1 = require("@nestjs/swagger");
const DesactivatePatient_in_Dto_1 = require("./dto/DesactivatePatient-in.Dto");
let PatientsController = class PatientsController {
    patientsService;
    constructor(patientsService) {
        this.patientsService = patientsService;
    }
    async findAll() {
        return await this.patientsService.findAll();
    }
    async search(searchDto) {
        return await this.patientsService.search(searchDto);
    }
    async findOne(id) {
        return await this.patientsService.findOne(id);
    }
    async create(createPatientDto) {
        return await this.patientsService.create(createPatientDto);
    }
    async update(id, updatePatientDto) {
        return await this.patientsService.update(id, updatePatientDto);
    }
    async desactivate(id, deactivatePatientDto) {
        return await this.patientsService.desactivate(id, deactivatePatientDto);
    }
};
exports.PatientsController = PatientsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los pacientes' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de pacientes obtenida exitosamente',
        type: [patient_response_out_dto_1.PatientResponseOutDto]
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PatientsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar pacientes por nombre, apellido o fecha de nacimiento' }),
    (0, swagger_1.ApiQuery)({ name: 'firstName', required: false, description: 'Nombre del paciente (búsqueda parcial)' }),
    (0, swagger_1.ApiQuery)({ name: 'lastName', required: false, description: 'Apellido del paciente (búsqueda parcial)' }),
    (0, swagger_1.ApiQuery)({ name: 'birthDate', required: false, description: 'Fecha de nacimiento exacta (YYYY-MM-DD)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Pacientes encontrados',
        type: [patient_response_out_dto_1.PatientResponseOutDto],
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Debe proporcionar al menos un criterio de búsqueda',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'No se encontraron pacientes con los criterios proporcionados',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_patient_in_dto_1.SearchPatientInDto]),
    __metadata("design:returntype", Promise)
], PatientsController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un paciente por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del paciente', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Paciente encontrado',
        type: patient_response_out_dto_1.PatientResponseOutDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Paciente no encontrado',
        schema: {
            example: {
                statusCode: 404,
                message: "Paciente con identificador '999' no encontrado",
                error: 'Not Found'
            }
        }
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PatientsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo paciente' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Paciente creado exitosamente',
        type: patient_response_out_dto_1.PatientResponseOutDto,
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
    __metadata("design:paramtypes", [create_patient_in_dto_1.CreatePatientInDto]),
    __metadata("design:returntype", Promise)
], PatientsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un paciente existente' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del paciente a actualizar', example: 18 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Paciente actualizado exitosamente',
        type: patient_response_out_dto_1.PatientResponseOutDto,
        schema: {
            example: {
                id: 18,
                firstName: 'Estella María',
                lastName: 'Castañeda Pérez',
                birthDate: '1988-03-11',
                gender: 'Femenino',
                status: 'Seguimiento'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos inválidos o actualización fallida',
        schema: {
            example: {
                statusCode: 400,
                message: ['El género debe ser Masculino, Femenino u Otro'],
                error: 'Bad Request'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Paciente no encontrado',
        schema: {
            example: {
                statusCode: 404,
                message: "Paciente con identificador '999' no encontrado",
                error: 'Not Found'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Ya existe otro paciente con esos datos',
        schema: {
            example: {
                statusCode: 409,
                message: 'Ya existe un paciente con el nombre Ana García López y fecha de nacimiento 1990-05-10',
                error: 'Conflict'
            }
        }
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_patient_in_dto_1.UpdatePatientInDto]),
    __metadata("design:returntype", Promise)
], PatientsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/desactivate'),
    (0, swagger_1.ApiOperation)({ summary: 'Desactivar un paciente (cambiar status a Inactivo)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del paciente a desactivar', example: 18 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Paciente desactivado exitosamente',
        type: patient_response_out_dto_1.PatientResponseOutDto,
        schema: {
            example: {
                id: 18,
                firstName: 'Estella',
                lastName: 'Castañeda perez',
                birthDate: '1988-03-11',
                gender: 'Femenino',
                status: 'Inactivo'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Paciente no encontrado',
        schema: {
            example: {
                statusCode: 404,
                message: "Paciente con identificador '999' no encontrado",
                error: 'Not Found'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'El paciente ya está inactivo',
        schema: {
            example: {
                statusCode: 409,
                message: "El paciente con ID 18 ya está inactivo",
                error: 'Conflict'
            }
        }
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, DesactivatePatient_in_Dto_1.DesactivatePatientInDto]),
    __metadata("design:returntype", Promise)
], PatientsController.prototype, "desactivate", null);
exports.PatientsController = PatientsController = __decorate([
    (0, swagger_1.ApiTags)('Pacientes'),
    (0, common_1.Controller)('patients'),
    __metadata("design:paramtypes", [patients_service_1.PatientsService])
], PatientsController);
//# sourceMappingURL=patients.controller.js.map