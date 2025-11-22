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
const TumorTypeNotFoundException_1 = require("./exceptions/TumorTypeNotFoundException");
const EmptyUpdateDataException_1 = require("./exceptions/EmptyUpdateDataException ");
const TumorTypeHasRecordsException_1 = require("./exceptions/TumorTypeHasRecordsException");
const InvalidSearchParamsException_1 = require("./exceptions/InvalidSearchParamsException");
const SearchNotFoundException_1 = require("./exceptions/SearchNotFoundException");
const typeorm_3 = require("typeorm");
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
    async findOne(id) {
        const tumorType = await this.tumorTypeRepository.findOne({
            where: { id },
        });
        if (!tumorType) {
            throw new TumorTypeNotFoundException_1.TumorTypeNotFoundException(id);
        }
        return this.toResponseDto(tumorType);
    }
    async update(id, updateDto) {
        const existingTumorType = await this.tumorTypeRepository.findOne({
            where: { id },
        });
        if (!existingTumorType) {
            throw new TumorTypeNotFoundException_1.TumorTypeNotFoundException(id);
        }
        const updateData = {};
        if (updateDto.name !== undefined && updateDto.name.trim() !== '') {
            updateData.name = updateDto.name.trim();
        }
        if (updateDto.systemAffected !== undefined && updateDto.systemAffected.trim() !== '') {
            updateData.systemAffected = updateDto.systemAffected.trim();
        }
        if (Object.keys(updateData).length === 0) {
            throw new EmptyUpdateDataException_1.EmptyUpdateDataException();
        }
        if (updateData.name && updateData.name !== existingTumorType.name) {
            const duplicateTumorType = await this.tumorTypeRepository.findOne({
                where: { name: updateData.name },
            });
            if (duplicateTumorType) {
                throw new TumorTypeAlreadyExistsException_1.TumorTypeAlreadyExistsException(updateData.name);
            }
        }
        await this.tumorTypeRepository.update(id, updateData);
        const updatedTumorType = await this.tumorTypeRepository.findOne({
            where: { id },
        });
        if (!updatedTumorType) {
            throw new TumorTypeNotFoundException_1.TumorTypeNotFoundException(id);
        }
        return this.toResponseDto(updatedTumorType);
    }
    toResponseDto(tumorType) {
        return {
            id: tumorType.id,
            name: tumorType.name,
            systemAffected: tumorType.systemAffected,
        };
    }
    async remove(id) {
        const existingTumorType = await this.tumorTypeRepository.findOne({
            where: { id },
            relations: ['clinicalRecords'],
        });
        if (!existingTumorType) {
            throw new TumorTypeNotFoundException_1.TumorTypeNotFoundException(id);
        }
        if (existingTumorType.clinicalRecords && existingTumorType.clinicalRecords.length > 0) {
            throw new TumorTypeHasRecordsException_1.TumorTypeHasRecordsException(id, existingTumorType.clinicalRecords.length);
        }
        await this.tumorTypeRepository.remove(existingTumorType);
        return {
            message: `Tipo de tumor con ID ${id} eliminado exitosamente`,
            success: true,
        };
    }
    async search(searchDto) {
        const searchData = {};
        if (searchDto.name !== undefined && searchDto.name.trim() !== '') {
            searchData.name = searchDto.name.trim();
        }
        if (searchDto.systemAffected !== undefined && searchDto.systemAffected.trim() !== '') {
            searchData.systemAffected = searchDto.systemAffected.trim();
        }
        if (Object.keys(searchData).length === 0) {
            throw new InvalidSearchParamsException_1.InvalidSearchParamsException();
        }
        const whereCondition = {};
        if (searchData.name) {
            whereCondition.name = (0, typeorm_3.Like)(`%${searchData.name}%`);
        }
        if (searchData.systemAffected) {
            whereCondition.systemAffected = (0, typeorm_3.Like)(`%${searchData.systemAffected}%`);
        }
        const tumorTypes = await this.tumorTypeRepository.find({
            where: whereCondition,
        });
        if (!tumorTypes || tumorTypes.length === 0) {
            throw new SearchNotFoundException_1.SearchNotFoundException(searchDto);
        }
        return tumorTypes.map(tt => this.toResponseDto(tt));
    }
};
exports.TumorTypesService = TumorTypesService;
exports.TumorTypesService = TumorTypesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tumor_type_entity_1.TumorType)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TumorTypesService);
//# sourceMappingURL=tumor-types.service.js.map