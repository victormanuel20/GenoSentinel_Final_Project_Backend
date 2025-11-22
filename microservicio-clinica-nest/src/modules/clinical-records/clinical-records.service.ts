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

  // 1. CREAR HISTORIA CLÍNICA
  async create(createDto: CreateClinicalRecordInDto): Promise<ClinicalRecordOutDto> {
    // 1.1 Validar que el paciente existe
    const patient = await this.patientRepository.findOne({
      where: { id: createDto.patientId },
    });

    if (!patient) {
      throw new PatientNotFoundForRecordException(createDto.patientId); // ← PASAR EL ID
    }

    // 1.2 Validar que el tipo de tumor existe
    const tumorType = await this.tumorTypeRepository.findOne({
      where: { id: createDto.tumorTypeId },
    });

    if (!tumorType) {
      throw new TumorTypeNotFoundForRecordException(createDto.tumorTypeId); // ← PASAR EL ID
    }

    // 1.3 Crear la historia clínica
    const clinicalRecord = this.clinicalRecordRepository.create({
      patientId: createDto.patientId,
      tumorTypeId: createDto.tumorTypeId,
      diagnosisDate: createDto.diagnosisDate,
      stage: createDto.stage,
      treatmentProtocol: createDto.treatmentProtocol,
    });

    // 1.4 Guardar
    const savedRecord = await this.clinicalRecordRepository.save(clinicalRecord);

    // 1.5 Cargar las relaciones para la respuesta
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

  
  


  /*
  create(createClinicalRecordDto: CreateClinicalRecordInDto) {
    return 'This action adds a new clinicalRecord';
  }

  findAll() {
    return `This action returns all clinicalRecords`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clinicalRecord`;
  }

  update(id: number, updateClinicalRecordDto: UpdateClinicalRecordDto) {
    return `This action updates a #${id} clinicalRecord`;
  }

  remove(id: number) {
    return `This action removes a #${id} clinicalRecord`;
  }

  */
}
