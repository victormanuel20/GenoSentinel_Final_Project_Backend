import { Controller, Get, Post, Body, Patch, Param, Delete,HttpCode, HttpStatus } from '@nestjs/common';
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

    @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un nuevo paciente' })
  @ApiResponse({ 
    status: 201, 
    description: 'Paciente creado exitosamente',
    type: PatientResponseDto,
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Datos inválidos (validación de campos)',
    schema: {
      example: {
        statusCode: 400,
        message: ['El nombre es obligatorio'],
        error: 'Bad Request'
      }
    }
  })
  @ApiResponse({ 
    status: 409, 
    description: 'El paciente ya existe (duplicado)',
    schema: {
      example: {
        statusCode: 409,
        message: 'Ya existe un paciente con el nombre Ana García López y fecha de nacimiento 1990-05-10',
        error: 'Conflict'
      }
    }
  })
  async create(@Body() createPatientDto: CreatePatientDto): Promise<PatientResponseDto> {
    return await this.patientsService.create(createPatientDto);
  }


}
