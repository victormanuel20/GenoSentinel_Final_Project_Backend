import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { PatientResponseDto } from './dto/patient-response.dto';
import { CreatePatientDto } from './dto/create-patient.dto';


@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async findAll(): Promise<PatientResponseDto[]> {
    const patients = await this.patientRepository.find();
    
    // Mapear manualmente a DTO
    return patients.map(patient => ({
      id: patient.id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      birthDate: patient.birthDate,
      gender: patient.gender,
      status: patient.status,
    }));
  }

    // Crear paciente
  async create(createPatientDto: CreatePatientDto): Promise<PatientResponseDto> {
    // 1. Crear la entidad
    const patient = this.patientRepository.create({
      firstName: createPatientDto.firstName,
      lastName: createPatientDto.lastName,
      birthDate: new Date(createPatientDto.birthDate), // Convertir string a Date
      gender: createPatientDto.gender,
      status: createPatientDto.status,
    });

    // 2. Guardar en la BD
    const savedPatient = await this.patientRepository.save(patient);

    // 3. Retornar como DTO
    return {
      id: savedPatient.id,
      firstName: savedPatient.firstName,
      lastName: savedPatient.lastName,
      birthDate: savedPatient.birthDate,
      gender: savedPatient.gender,
      status: savedPatient.status,
    };
  }


}