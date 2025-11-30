import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';
import { TumorType } from '../../tumor-types/entities/tumor-type.entity';

@Entity('clinical_record')
export class ClinicalRecord {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'patient_id', type: 'bigint' })
  patientId: number;

  @Column({ name: 'tumor_type_id', type: 'bigint' })
  tumorTypeId: number;

  @Column({ name: 'diagnosis_date', type: 'date' })
  diagnosisDate: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  stage: string;

  @Column({ name: 'treatment_protocol', type: 'text', nullable: true })
  treatmentProtocol: string;

  // Relación N:1 con Patient
  @ManyToOne(() => Patient, (patient) => patient.clinicalRecords, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  // Relación N:1 con TumorType
  @ManyToOne(() => TumorType, (tumorType) => tumorType.clinicalRecords, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'tumor_type_id' })
  tumorType: TumorType;
}