import { CreatePatientDto } from './create-patient.dto';
import { Gender, PatientStatus } from '../entities/patient.entity';
declare const UpdatePatientDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreatePatientDto>>;
export declare class UpdatePatientDto extends UpdatePatientDto_base {
    firstName?: string;
    lastName?: string;
    birthDate?: string;
    gender?: Gender;
    status?: PatientStatus;
}
export {};
