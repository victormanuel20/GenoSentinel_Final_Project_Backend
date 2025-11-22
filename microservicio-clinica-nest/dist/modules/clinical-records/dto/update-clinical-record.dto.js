"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClinicalRecordDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_clinical_record_in_dto_1 = require("./create-clinical-record-in.dto");
class UpdateClinicalRecordDto extends (0, mapped_types_1.PartialType)(create_clinical_record_in_dto_1.CreateClinicalRecordInDto) {
}
exports.UpdateClinicalRecordDto = UpdateClinicalRecordDto;
//# sourceMappingURL=update-clinical-record.dto.js.map