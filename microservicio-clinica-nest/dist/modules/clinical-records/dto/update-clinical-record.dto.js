"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClinicalRecordDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_clinical_record_dto_1 = require("./create-clinical-record.dto");
class UpdateClinicalRecordDto extends (0, mapped_types_1.PartialType)(create_clinical_record_dto_1.CreateClinicalRecordDto) {
}
exports.UpdateClinicalRecordDto = UpdateClinicalRecordDto;
//# sourceMappingURL=update-clinical-record.dto.js.map