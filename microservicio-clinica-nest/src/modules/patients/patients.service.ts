import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { PatientResponseDto } from './dto/patient-response.dto';
import { CreatePatientDto } from './dto/create-patient.dto';
import { SearchPatientDto } from './dto/search-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ConflictException, Injectable } from '@nestjs/common';
import { PatientAlreadyExistsException } from './exceptions/PatientAlreadyExistsException';
import { PatientNotFoundException } from './exceptions/patient-not-found.exception';
import { InvalidSearchParamsException } from './exceptions/invalid-search-params.exception';
import { PatientsNotFoundException } from './exceptions/PatientsNotFoundException';
import { PatientUpdateFailedException } from './exceptions/PatientUpdateFailedException';




@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

   async findAll(): Promise<PatientResponseDto[]> {
    const patients = await this.patientRepository.find();
    
    return patients.map(patient => ({
      id: patient.id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      birthDate: patient.birthDate, // Ya es string
      gender: patient.gender,
      status: patient.status,
    }));
  }


  // BUSCAR POR ID
  async findOne(id: number): Promise<PatientResponseDto> {
    const patient = await this.patientRepository.findOne({
      where: { id },
    });

    if (!patient) {
      throw new PatientNotFoundException(id);
    }

    return this.toResponseDto(patient);
  }

  // BUSCAR POR CRITERIOS (nombre, apellido, fecha)
  async search(searchDto: SearchPatientDto): Promise<PatientResponseDto[]> {
    // Validar que al menos un criterio esté presente
    if (!searchDto.firstName && !searchDto.lastName && !searchDto.birthDate) {
      throw new InvalidSearchParamsException();
    }

    // Construir query dinámica
    const whereCondition: any = {};

    if (searchDto.firstName) {
      whereCondition.firstName = Like(`%${searchDto.firstName}%`); // Búsqueda parcial
    }

    if (searchDto.lastName) {
      whereCondition.lastName = Like(`%${searchDto.lastName}%`); // Búsqueda parcial
    }

    if (searchDto.birthDate) {
      whereCondition.birthDate = searchDto.birthDate; // Búsqueda exacta
    }

    const patients = await this.patientRepository.find({
      where: whereCondition,
    });

    // 4. Si no hay resultados → 404
    if (!patients || patients.length === 0) {
      throw new PatientsNotFoundException(searchDto);
    }


    return patients.map(patient => this.toResponseDto(patient));
  }


  async create(createPatientDto: CreatePatientDto): Promise<PatientResponseDto> {
    // 1. Buscar pacientes con el mismo nombre Y fecha
    const existingPatient = await this.patientRepository.findOne({
      where: {
        firstName: createPatientDto.firstName,
        lastName: createPatientDto.lastName,
        birthDate: createPatientDto.birthDate, // Ahora es string vs string
      },
    });

    console.log('🔍 Buscando duplicado:', {
      firstName: createPatientDto.firstName,
      lastName: createPatientDto.lastName,
      birthDate: createPatientDto.birthDate,
    });
    console.log('🔍 Resultado:', existingPatient);

    if (existingPatient) {
      throw new PatientAlreadyExistsException(
        createPatientDto.firstName,
        createPatientDto.lastName,
        createPatientDto.birthDate,
      );
    }

    // 2. Crear la entidad
    const patient = this.patientRepository.create({
      firstName: createPatientDto.firstName,
      lastName: createPatientDto.lastName,
      birthDate: createPatientDto.birthDate, // Ya no convertimos a Date
      gender: createPatientDto.gender,
      status: createPatientDto.status,
    });

    // 3. Guardar en la BD
    const savedPatient = await this.patientRepository.save(patient);

    // 4. Retornar como DTO
    return {
      id: savedPatient.id,
      firstName: savedPatient.firstName,
      lastName: savedPatient.lastName,
      birthDate: savedPatient.birthDate,
      gender: savedPatient.gender,
      status: savedPatient.status,
    };
  }

  //Convertir Entity a DTO
  private toResponseDto(patient: Patient): PatientResponseDto {
    return {
      id: patient.id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      birthDate: patient.birthDate,
      gender: patient.gender,
      status: patient.status,
    };
  }


  async update(id: number, updatePatientDto: UpdatePatientDto): Promise<PatientResponseDto> {
  // 1. Verificar que el paciente existe
  const existingPatient = await this.patientRepository.findOne({
    where: { id },
  });

  if (!existingPatient) {
    throw new PatientNotFoundException(id);
  }

 // 2. Si se actualizan nombre, apellido o fecha → validar que no exista duplicado
if (updatePatientDto.firstName || updatePatientDto.lastName || updatePatientDto.birthDate) {
  const firstName = updatePatientDto.firstName ?? existingPatient.firstName;
  const lastName = updatePatientDto.lastName ?? existingPatient.lastName;
  const birthDate = updatePatientDto.birthDate ?? existingPatient.birthDate;

  const duplicate = await this.patientRepository.findOne({
    where: { firstName, lastName, birthDate },
  });

  // Si existe duplicado y NO es el mismo paciente que estamos actualizando
  if (duplicate && duplicate.id !== id) {
    throw new PatientAlreadyExistsException(
      firstName, 
      lastName, 
      birthDate as string // ← AGREGAR "as string"
    );
  }
}

  // 3. Actualizar
  try {
    await this.patientRepository.update(id, updatePatientDto);
  } catch (error) {
    throw new PatientUpdateFailedException(id, error.message);
  }

  // 4. Retornar el paciente actualizado
  const updatedPatient = await this.patientRepository.findOne({
    where: { id },
  });

  // Validar que se obtuvo el paciente actualizado
  if (!updatedPatient) {
    throw new PatientNotFoundException(id);
  }

  return this.toResponseDto(updatedPatient);
}


  /*  
    // Crear paciente-- PRIMERA FORMA 
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

  

  async create(createPatientDto: CreatePatientDto): Promise<PatientResponseDto> {
     // ✅ 1. Validar que no exista un paciente duplicado
  const existingPatient = await this.patientRepository.findOne({
    where: {
      firstName: createPatientDto.firstName,
      lastName: createPatientDto.lastName,
      birthDate: new Date(createPatientDto.birthDate),
    },
  });

  console.log('🔍 Buscando duplicado:', {
    firstName: createPatientDto.firstName,
    lastName: createPatientDto.lastName,
    birthDate: new Date(createPatientDto.birthDate),
  });
  console.log('🔍 Resultado:', existingPatient);

  if (existingPatient) {
    throw new PatientAlreadyExistsException(
      createPatientDto.firstName,
      createPatientDto.lastName,
      createPatientDto.birthDate,
    );
  }

    // 2. Crear la entidad
    const patient = this.patientRepository.create({
      firstName: createPatientDto.firstName,
      lastName: createPatientDto.lastName,
      birthDate: new Date(createPatientDto.birthDate),
      gender: createPatientDto.gender,
      status: createPatientDto.status,
    });

    // 3. Guardar en la BD
    const savedPatient = await this.patientRepository.save(patient);

    // 4. Retornar como DTO
    return {
      id: savedPatient.id,
      firstName: savedPatient.firstName,
      lastName: savedPatient.lastName,
      birthDate: savedPatient.birthDate,
      gender: savedPatient.gender,
      status: savedPatient.status,
    };
  }

  */


}