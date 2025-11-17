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
    birthDate: Date;
    gender: Gender;
    status: PatientStatus;
}
