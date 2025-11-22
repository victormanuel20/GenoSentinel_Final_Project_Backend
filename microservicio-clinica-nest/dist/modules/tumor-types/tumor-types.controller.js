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
exports.TumorTypesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const tumor_types_service_1 = require("./tumor-types.service");
const TumorTypeResponseDto_1 = require("./dto/TumorTypeResponseDto");
const create_tumor_type_dto_1 = require("./dto/create-tumor-type.dto");
const update_tumor_type_dto_1 = require("./dto/update-tumor-type.dto");
let TumorTypesController = class TumorTypesController {
    tumorTypesService;
    constructor(tumorTypesService) {
        this.tumorTypesService = tumorTypesService;
    }
    async create(createDto) {
        return await this.tumorTypesService.create(createDto);
    }
    async findAll() {
        return await this.tumorTypesService.findAll();
    }
    async findOne(id) {
        return await this.tumorTypesService.findOne(id);
    }
    async update(id, updateDto) {
        return await this.tumorTypesService.update(id, updateDto);
    }
    async remove(id) {
        return await this.tumorTypesService.remove(id);
    }
};
exports.TumorTypesController = TumorTypesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo tipo de tumor' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Tipo de tumor creado exitosamente',
        type: TumorTypeResponseDto_1.TumorTypeResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Ya existe un tipo de tumor con ese nombre',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tumor_type_dto_1.CreateTumorTypeDto]),
    __metadata("design:returntype", Promise)
], TumorTypesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los tipos de tumor' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de tipos de tumor',
        type: [TumorTypeResponseDto_1.TumorTypeResponseDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TumorTypesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un tipo de tumor por ID' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID del tipo de tumor',
        example: 1,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Tipo de tumor encontrado',
        type: TumorTypeResponseDto_1.TumorTypeResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Tipo de tumor no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TumorTypesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un tipo de tumor existente' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del tipo de tumor a actualizar', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Tipo de tumor actualizado exitosamente',
        type: TumorTypeResponseDto_1.TumorTypeResponseDto,
        schema: {
            example: {
                id: 1,
                name: 'Cáncer de mama triple negativo',
                systemAffected: 'Glándulas mamarias'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos inválidos o body vacío',
        schema: {
            examples: {
                emptyBody: {
                    value: {
                        statusCode: 400,
                        message: 'Debe proporcionar al menos un campo para actualizar (name o systemAffected)',
                        error: 'Bad Request'
                    }
                },
                emptyFields: {
                    value: {
                        statusCode: 400,
                        message: ['El nombre es obligatorio', 'El sistema afectado es obligatorio'],
                        error: 'Bad Request'
                    }
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Tipo de tumor no encontrado',
        schema: {
            example: {
                statusCode: 404,
                message: 'Tipo de tumor con ID 999 no encontrado',
                error: 'Not Found'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Ya existe otro tipo de tumor con ese nombre',
        schema: {
            example: {
                statusCode: 409,
                message: 'Ya existe un tipo de tumor con el nombre "Cáncer de pulmón"',
                error: 'Conflict'
            }
        }
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_tumor_type_dto_1.UpdateTumorTypeDto]),
    __metadata("design:returntype", Promise)
], TumorTypesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un tipo de tumor' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del tipo de tumor a eliminar', example: 4 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Tipo de tumor eliminado exitosamente',
        schema: {
            example: {
                message: 'Tipo de tumor con ID 4 eliminado exitosamente',
                success: true
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Tipo de tumor no encontrado',
        schema: {
            example: {
                statusCode: 404,
                message: 'Tipo de tumor con ID 999 no encontrado',
                error: 'Not Found'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'No se puede eliminar porque tiene historias clínicas asociadas',
        schema: {
            example: {
                statusCode: 409,
                message: 'No se puede eliminar el tipo de tumor con ID 1 porque tiene 1 historia(s) clínica(s) asociada(s)',
                error: 'Conflict'
            }
        }
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TumorTypesController.prototype, "remove", null);
exports.TumorTypesController = TumorTypesController = __decorate([
    (0, swagger_1.ApiTags)('Tipos de Tumor'),
    (0, common_1.Controller)('tumor-types'),
    __metadata("design:paramtypes", [tumor_types_service_1.TumorTypesService])
], TumorTypesController);
//# sourceMappingURL=tumor-types.controller.js.map