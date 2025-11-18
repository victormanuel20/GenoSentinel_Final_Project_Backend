import { Patient } from '../../patients/entities/patient.entity';
import { TumorType } from '../../tumor-types/entities/tumor-type.entity';
export declare class ClinicalRecord {
    id: number;
    patientId: number;
    tumorTypeId: number;
    diagnosisDate: string;
    stage: string;
    treatmentProtocol: string;
    patient: Patient;
    tumorType: TumorType;
}
