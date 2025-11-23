
import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus, ParseIntPipe, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ClinicalRecordsService } from './clinical-records.service';
import { CreateClinicalRecordInDto } from './dto/create-clinical-record-in.dto';
import { ClinicalRecordOutDto } from './dto/clinical-record-out.dto';
import { UpdateClinicalRecordInDto } from './dto/update-clinical-record-in.dto';

@ApiTags('Historias Clínicas')
@Controller('clinical-records')
export class ClinicalRecordsController {
  constructor(private readonly clinicalRecordsService: ClinicalRecordsService) {}

  // 1. CREAR HISTORIA CLÍNICA
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una nueva historia clínica' })
  @ApiResponse({ 
    status: 201, 
    description: 'Historia clínica creada exitosamente',
    type: ClinicalRecordOutDto,
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Datos inválidos',
    schema: {
      example: {
        statusCode: 400,
        message: ['El ID del paciente es obligatorio'],
        error: 'Bad Request'
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Paciente o tipo de tumor no encontrado',
    schema: {
      example: {
        statusCode: 404,
        message: 'No se puede crear la historia clínica: el paciente con ID 999 no existe',
        error: 'Not Found'
      }
    }
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Ya existe una historia clínica idéntica',
  })

  async create(@Body() createDto: CreateClinicalRecordInDto): Promise<ClinicalRecordOutDto> {
    return await this.clinicalRecordsService.create(createDto);
  }

  // 2. LISTAR TODAS LAS HISTORIAS CLÍNICAS
  @Get()
  @ApiOperation({ summary: 'Obtener todas las historias clínicas' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de historias clínicas',
    type: [ClinicalRecordOutDto],
  })
  async findAll(): Promise<ClinicalRecordOutDto[]> {
    return await this.clinicalRecordsService.findAll();
  }

   //  3.  (historias de un paciente)
  @Get('patient/:patientId')
  @ApiOperation({ summary: 'Obtener todas las historias clínicas de un paciente' })
  @ApiParam({ name: 'patientId', description: 'ID del paciente', example: 1 })
  @ApiResponse({ status: 200, description: 'Historias clínicas del paciente', type: [ClinicalRecordOutDto] })
  @ApiResponse({ status: 404, description: 'Paciente no encontrado o sin historias clínicas' })
  async findByPatient(@Param('patientId', ParseIntPipe) patientId: number): Promise<ClinicalRecordOutDto[]> {
    return await this.clinicalRecordsService.findByPatient(patientId);
  }

  //  4. (historias de un tipo de tumor)
  @Get('tumor-type/:tumorTypeId')
  @ApiOperation({ summary: 'Obtener todas las historias clínicas de un tipo de tumor' })
  @ApiParam({ name: 'tumorTypeId', description: 'ID del tipo de tumor', example: 1 })
  @ApiResponse({ status: 200, description: 'Historias clínicas del tipo de tumor', type: [ClinicalRecordOutDto] })
  @ApiResponse({ status: 404, description: 'Tipo de tumor no encontrado o sin historias clínicas' })
  async findByTumorType(@Param('tumorTypeId', ParseIntPipe) tumorTypeId: number): Promise<ClinicalRecordOutDto[]> {
    return await this.clinicalRecordsService.findByTumorType(tumorTypeId);
  }

  // 4. BUSCAR HISTORIA CLÍNICA POR ID
  @Get(':id')
  @ApiOperation({ summary: 'Obtener una historia clínica por ID' })
  @ApiParam({ name: 'id', description: 'ID de la historia clínica', example: 1 })
  @ApiResponse({ 
    status: 200, 
    description: 'Historia clínica encontrada',
    type: ClinicalRecordOutDto,
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Historia clínica no encontrada',
    schema: {
      example: {
        statusCode: 404,
        message: 'Historia clínica con ID 999 no encontrada',
        error: 'Not Found'
      }
    }
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ClinicalRecordOutDto> {
    return await this.clinicalRecordsService.findOne(id);
  }

  // 6. ACTUALIZAR HISTORIA CLÍNICa
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar la evolución de una historia clínica (stage y/o tratamiento)' })
  @ApiParam({ name: 'id', description: 'ID de la historia clínica', example: 1 })
  @ApiResponse({ 
    status: 200, 
    description: 'Historia clínica actualizada exitosamente',
    type: ClinicalRecordOutDto,
    schema: {
      example: {
        id: 1,
        patientId: 1,
        tumorTypeId: 1,
        diagnosisDate: '2023-01-15',
        stage: 'III',
        treatmentProtocol: 'Quimioterapia de segunda línea',
        patient: {
          id: 1,
          fullName: 'Ana García López',
          gender: 'Femenino',
          status: 'Activo'
        },
        tumorType: {
          id: 1,
          name: 'Cáncer de mama',
          systemAffected: 'Glándulas'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Datos inválidos o sin campos para actualizar',
    schema: {
      examples: {
        noFields: {
          value: {
            statusCode: 400,
            message: 'Debe proporcionar al menos un campo para actualizar (stage o treatmentProtocol)',
            error: 'Bad Request'
          }
        },
        emptyFields: {
          value: {
            statusCode: 400,
            message: ['La etapa debe ser texto'],
            error: 'Bad Request'
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Historia clínica no encontrada',
    schema: {
      example: {
        statusCode: 404,
        message: 'Historia clínica con ID 999 no encontrada',
        error: 'Not Found'
      }
    }
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateClinicalRecordInDto,
  ): Promise<ClinicalRecordOutDto> {
    return await this.clinicalRecordsService.update(id, updateDto);
  }


 
}
