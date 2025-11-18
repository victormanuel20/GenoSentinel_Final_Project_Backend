import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ClinicalRecord } from '../../clinical-records/entities/clinical-record.entity';

@Entity('tumor_type')
export class TumorType {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ name: 'system_affected', type: 'varchar', length: 150 })
  systemAffected: string;

  // Relación 1:N con ClinicalRecord
  @OneToMany(() => ClinicalRecord, (clinicalRecord) => clinicalRecord.tumorType)
  clinicalRecords: ClinicalRecord[];
}