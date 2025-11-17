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
export declare class CreatePatientDto {
    firstName: string;
    lastName: string;
    birthDate: string;
    gender: Gender;
    status: PatientStatus;
}
