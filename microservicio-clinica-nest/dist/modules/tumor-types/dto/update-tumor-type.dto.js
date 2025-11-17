"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTumorTypeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_tumor_type_dto_1 = require("./create-tumor-type.dto");
class UpdateTumorTypeDto extends (0, mapped_types_1.PartialType)(create_tumor_type_dto_1.CreateTumorTypeDto) {
}
exports.UpdateTumorTypeDto = UpdateTumorTypeDto;
//# sourceMappingURL=update-tumor-type.dto.js.map