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
exports.TumorTypesController = TumorTypesController = __decorate([
    (0, swagger_1.ApiTags)('Tipos de Tumor'),
    (0, common_1.Controller)('tumor-types'),
    __metadata("design:paramtypes", [tumor_types_service_1.TumorTypesService])
], TumorTypesController);
//# sourceMappingURL=tumor-types.controller.js.map