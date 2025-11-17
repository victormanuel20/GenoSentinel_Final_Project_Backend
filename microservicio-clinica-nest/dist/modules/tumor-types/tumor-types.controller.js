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
const tumor_types_service_1 = require("./tumor-types.service");
const create_tumor_type_dto_1 = require("./dto/create-tumor-type.dto");
const update_tumor_type_dto_1 = require("./dto/update-tumor-type.dto");
let TumorTypesController = class TumorTypesController {
    tumorTypesService;
    constructor(tumorTypesService) {
        this.tumorTypesService = tumorTypesService;
    }
    create(createTumorTypeDto) {
        return this.tumorTypesService.create(createTumorTypeDto);
    }
    findAll() {
        return this.tumorTypesService.findAll();
    }
    findOne(id) {
        return this.tumorTypesService.findOne(+id);
    }
    update(id, updateTumorTypeDto) {
        return this.tumorTypesService.update(+id, updateTumorTypeDto);
    }
    remove(id) {
        return this.tumorTypesService.remove(+id);
    }
};
exports.TumorTypesController = TumorTypesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tumor_type_dto_1.CreateTumorTypeDto]),
    __metadata("design:returntype", void 0)
], TumorTypesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TumorTypesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TumorTypesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_tumor_type_dto_1.UpdateTumorTypeDto]),
    __metadata("design:returntype", void 0)
], TumorTypesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TumorTypesController.prototype, "remove", null);
exports.TumorTypesController = TumorTypesController = __decorate([
    (0, common_1.Controller)('tumor-types'),
    __metadata("design:paramtypes", [tumor_types_service_1.TumorTypesService])
], TumorTypesController);
//# sourceMappingURL=tumor-types.controller.js.map