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
exports.UpdateTumorTypeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const create_tumor_type_dto_1 = require("./create-tumor-type.dto");
class UpdateTumorTypeDto extends (0, mapped_types_1.PartialType)(create_tumor_type_dto_1.CreateTumorTypeDto) {
    name;
    systemAffected;
}
exports.UpdateTumorTypeDto = UpdateTumorTypeDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Cáncer de mama invasivo',
        description: 'Nombre del tipo de tumor (opcional)',
    }),
    (0, class_validator_1.IsString)({ message: 'El nombre debe ser texto' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTumorTypeDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Glándulas mamarias',
        description: 'Sistema o región del cuerpo afectada (opcional)',
    }),
    (0, class_validator_1.IsString)({ message: 'El sistema afectado debe ser texto' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTumorTypeDto.prototype, "systemAffected", void 0);
//# sourceMappingURL=update-tumor-type.dto.js.map