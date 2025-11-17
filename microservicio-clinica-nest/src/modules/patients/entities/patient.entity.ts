import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

export enum Gender {
  MASCULINO = 'Masculino',
  FEMENINO = 'Femenino',
  OTRO = 'Otro',
}

export enum PatientStatus {
  ACTIVO = 'Activo',
  SEGUIMIENTO = 'Seguimiento',
  INACTIVO = 'Inactivo',
}

@Entity('patient')
export class Patient {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'first_name', length: 100 })
  firstName: string;

  @Column({ name: 'last_name', length: 100 })
  lastName: string;

  @Column({ name: 'birth_date', type: 'date' })
  birthDate: String;

  @Column({
    type: 'enum',
    enum: Gender,
  })
  gender: Gender;

  @Column({
    type: 'enum',
    enum: PatientStatus,
    default: PatientStatus.ACTIVO,
  })
  status: PatientStatus;

  // ⚠️ COMENTADO por ahora - lo activamos después
  // @OneToMany(() => ClinicalRecord, (record) => record.patient)
  // clinicalRecords: ClinicalRecord[];
}
