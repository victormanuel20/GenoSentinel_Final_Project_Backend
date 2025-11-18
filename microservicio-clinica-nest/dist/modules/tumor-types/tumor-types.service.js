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
exports.TumorTypesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tumor_type_entity_1 = require("./entities/tumor-type.entity");
const TumorTypeAlreadyExistsException_1 = require("./exceptions/TumorTypeAlreadyExistsException");
let TumorTypesService = class TumorTypesService {
    tumorTypeRepository;
    constructor(tumorTypeRepository) {
        this.tumorTypeRepository = tumorTypeRepository;
    }
    async create(createDto) {
        const existing = await this.tumorTypeRepository.findOne({
            where: { name: createDto.name },
        });
        if (existing) {
            throw new TumorTypeAlreadyExistsException_1.TumorTypeAlreadyExistsException(createDto.name);
        }
        const tumorType = this.tumorTypeRepository.create(createDto);
        const saved = await this.tumorTypeRepository.save(tumorType);
        return this.toResponseDto(saved);
    }
    async findAll() {
        const tumorTypes = await this.tumorTypeRepository.find();
        return tumorTypes.map(tt => this.toResponseDto(tt));
    }
    toResponseDto(tumorType) {
        return {
            id: tumorType.id,
            name: tumorType.name,
            systemAffected: tumorType.systemAffected,
        };
    }
};
exports.TumorTypesService = TumorTypesService;
exports.TumorTypesService = TumorTypesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tumor_type_entity_1.TumorType)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TumorTypesService);
//# sourceMappingURL=tumor-types.service.js.map