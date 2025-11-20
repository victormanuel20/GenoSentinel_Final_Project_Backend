import { CreateTumorTypeDto } from './create-tumor-type.dto';
declare const UpdateTumorTypeDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateTumorTypeDto>>;
export declare class UpdateTumorTypeDto extends UpdateTumorTypeDto_base {
    name?: string;
    systemAffected?: string;
}
export {};
