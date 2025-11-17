import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { PatientResponseDto } from './dto/patient-response.dto';

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
}