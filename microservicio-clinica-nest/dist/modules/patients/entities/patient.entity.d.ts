import { ClinicalRecord } from '../../clinical-records/entities/clinical-record.entity';
export declare enum Gender {
    MASCULINO = "Masculino",
    FEMENINO = "Femenino",
    OTRO = "Otro"
}
export declare enum PatientStatus {
    ACTIVO = "Activo",
    SEGUIMIENTO = "Seguimiento",
    INACTIVO = "Inactivo"
}
export declare class Patient {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: String;
    gender: Gender;
    status: PatientStatus;
    clinicalRecords: ClinicalRecord[];
}
