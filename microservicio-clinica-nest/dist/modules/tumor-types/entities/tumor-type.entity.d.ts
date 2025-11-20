import { ClinicalRecord } from '../../clinical-records/entities/clinical-record.entity';
export declare class TumorType {
    id: number;
    name: string;
    systemAffected: string;
    clinicalRecords: ClinicalRecord[];
}
