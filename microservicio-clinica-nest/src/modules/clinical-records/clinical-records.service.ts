import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClinicalRecord } from './entities/clinical-record.entity';
import { Patient } from '../patients/entities/patient.entity';
import { TumorType } from '../tumor-types/entities/tumor-type.entity';
import { CreateClinicalRecordInDto } from './dto/create-clinical-record-in.dto';
import { ClinicalRecordOutDto } from './dto/clinical-record-out.dto';
import { ClinicalRecordNotFoundException } from './exceptions/clinical-record-not-found.exception';
import { PatientNotFoundForRecordException } from './exceptions/patient-not-found-for-record.exception';
import { TumorTypeNotFoundForRecordException } from './exceptions/tumor-type-not-found-for-record.exception';
import { DuplicateClinicalRecordException } from './exceptions/duplicate-clinical-record.exception';
import { NoRecordsFoundForPatientException } from './exceptions/no-records-found-for-patient.exception';
import { NoRecordsFoundForTumorTypeException } from './exceptions/no-records-found-for-tumor-type.exception';

@Injectable()
export class ClinicalRecordsService {

  constructor(
    @InjectRepository(ClinicalRecord)
    private readonly clinicalRecordRepository: Repository<ClinicalRecord>,
    
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>, // ← Inyectas el Repository
    
    @InjectRepository(TumorType)
    private readonly tumorTypeRepository: Repository<TumorType>, // ← Inyectas el Repository
  ) {}

    async create(createDto: CreateClinicalRecordInDto): Promise<ClinicalRecordOutDto> {
    // 1. Validar que el paciente existe
    const patient = await this.patientRepository.findOne({
      where: { id: createDto.patientId },
    });

    if (!patient) {
      throw new PatientNotFoundForRecordException(createDto.patientId);
    }

    // 2. Validar que el tipo de tumor existe
    const tumorType = await this.tumorTypeRepository.findOne({
      where: { id: createDto.tumorTypeId },
    });

    if (!tumorType) {
      throw new TumorTypeNotFoundForRecordException(createDto.tumorTypeId);
    }

    // Verificar si ya existe un registro IDÉNTICO
    const existingRecord = await this.clinicalRecordRepository.findOne({
      where: {
        patientId: createDto.patientId,
        tumorTypeId: createDto.tumorTypeId,
        diagnosisDate: createDto.diagnosisDate,
      },
    });

    if (existingRecord) {
      throw new DuplicateClinicalRecordException(
        createDto.patientId,
        createDto.tumorTypeId,
        createDto.diagnosisDate
      );
    }

    // 4. Crear la historia clínica
    const clinicalRecord = this.clinicalRecordRepository.create({
      patientId: createDto.patientId,
      tumorTypeId: createDto.tumorTypeId,
      diagnosisDate: createDto.diagnosisDate,
      stage: createDto.stage,
      treatmentProtocol: createDto.treatmentProtocol,
    });

    // 5. Guardar
    const savedRecord = await this.clinicalRecordRepository.save(clinicalRecord);

    // 6. Cargar las relaciones
    const recordWithRelations = await this.clinicalRecordRepository.findOne({
      where: { id: savedRecord.id },
      relations: ['patient', 'tumorType'],
    });

    return this.toOutDto(recordWithRelations!);
  }


  // 2. LISTAR TODAS
  async findAll(): Promise<ClinicalRecordOutDto[]> {
    const records = await this.clinicalRecordRepository.find({
      relations: ['patient', 'tumorType'],
    });

    return records.map(record => this.toOutDto(record));
  }

  // 3. BUSCAR POR ID
  async findOne(id: number): Promise<ClinicalRecordOutDto> {
    const record = await this.clinicalRecordRepository.findOne({
      where: { id },
      relations: ['patient', 'tumorType'],
    });

    if (!record) {
      throw new ClinicalRecordNotFoundException(id); // ← PASAR EL ID
    }

    return this.toOutDto(record);
  }

  // 4. OBTENER HISTORIAS CLÍNICAS DE UN PACIENTE
async findByPatient(patientId: number): Promise<ClinicalRecordOutDto[]> {
  // 1. Verificar que el paciente existe
  const patient = await this.patientRepository.findOne({
    where: { id: patientId },
  });

  if (!patient) {
    throw new PatientNotFoundForRecordException(patientId);
  }

  // 2. Buscar todas las historias del paciente
  const records = await this.clinicalRecordRepository.find({
    where: { patientId },
    relations: ['patient', 'tumorType'],
    order: { diagnosisDate: 'DESC' }, // ← Más recientes primero
  });

  // 3. Si no tiene historias, lanzar excepción
  if (!records || records.length === 0) {
    throw new NoRecordsFoundForPatientException(patientId);
  }

  return records.map(record => this.toOutDto(record));
}

// 5. OBTENER HISTORIAS CLÍNICAS DE UN TIPO DE TUMOR
async findByTumorType(tumorTypeId: number): Promise<ClinicalRecordOutDto[]> {
  // 1. Verificar que el tipo de tumor existe
  const tumorType = await this.tumorTypeRepository.findOne({
    where: { id: tumorTypeId },
  });

  if (!tumorType) {
    throw new TumorTypeNotFoundForRecordException(tumorTypeId);
  }

  // 2. Buscar todas las historias del tipo de tumor
  const records = await this.clinicalRecordRepository.find({
    where: { tumorTypeId },
    relations: ['patient', 'tumorType'],
    order: { diagnosisDate: 'DESC' }, // ← Más recientes primero
  });

  // 3. Si no tiene historias, lanzar excepción
  if (!records || records.length === 0) {
    throw new NoRecordsFoundForTumorTypeException(tumorTypeId);
  }

  return records.map(record => this.toOutDto(record));
}

  // MÉTODO AUXILIAR: Convertir Entity a OutDto
  private toOutDto(record: ClinicalRecord): ClinicalRecordOutDto {
    return {
      id: record.id,
      patientId: record.patientId,
      tumorTypeId: record.tumorTypeId,
      diagnosisDate: record.diagnosisDate,
      stage: record.stage || undefined,
      treatmentProtocol: record.treatmentProtocol || undefined,
      patient: {
        id: record.patient.id,
        fullName: `${record.patient.firstName} ${record.patient.lastName}`,
        gender: record.patient.gender,
        status: record.patient.status,
      },
      tumorType: {
        id: record.tumorType.id,
        name: record.tumorType.name,
        systemAffected: record.tumorType.systemAffected,
      },
    };
  }

  
  

}
