
import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ClinicalRecordsService } from './clinical-records.service';
import { CreateClinicalRecordInDto } from './dto/create-clinical-record-in.dto';
import { ClinicalRecordOutDto } from './dto/clinical-record-out.dto';

@ApiTags('Historias clinicas')
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

  // 3. BUSCAR HISTORIA CLÍNICA POR ID
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


 
}
