import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientResponseDto } from './dto/patient-response.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';



@ApiTags('Pacientes') // ← Agrupa en Swagger bajo "Pacientes"
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los pacientes' }) // ← Descripción del endpoint
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de pacientes obtenida exitosamente',
    type: [PatientResponseDto] // ← Documenta el tipo de respuesta
  })
  async findAll(): Promise<PatientResponseDto[]> {
    return await this.patientsService.findAll();
  }

  // Crear paciente
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo paciente' })
  @ApiResponse({ 
    status: 201, 
    description: 'Paciente creado exitosamente',
    type: PatientResponseDto,
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Datos inválidos',
  })
  async create(@Body() createPatientDto: CreatePatientDto): Promise<PatientResponseDto> {
    return await this.patientsService.create(createPatientDto);
  }


}
