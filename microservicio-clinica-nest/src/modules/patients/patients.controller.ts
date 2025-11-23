import { Controller, Get, Post, Body, Patch, Param, Delete,HttpCode, HttpStatus,Query,ParseIntPipe } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientResponseOutDto } from './dto/patient-response-out.dto';
import { SearchPatientDto } from './dto/search-patient.dto';
import { ApiTags, ApiOperation, ApiResponse,ApiParam, ApiQuery } from '@nestjs/swagger';
import { DesactivatePatientDto } from './dto/DesactivatePatientDto';




@ApiTags('Pacientes') // ← Agrupa en Swagger bajo "Pacientes"
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los pacientes' }) // ← Descripción del endpoint
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de pacientes obtenida exitosamente',
    type: [PatientResponseOutDto] // ← Documenta el tipo de respuesta
  })
  async findAll(): Promise<PatientResponseOutDto[]> {
    return await this.patientsService.findAll();
  }

  //  BUSCAR POR CRITERIOS 
  @Get('search')
  @ApiOperation({ summary: 'Buscar pacientes por nombre, apellido o fecha de nacimiento' })
  @ApiQuery({ name: 'firstName', required: false, description: 'Nombre del paciente (búsqueda parcial)' })
  @ApiQuery({ name: 'lastName', required: false, description: 'Apellido del paciente (búsqueda parcial)' })
  @ApiQuery({ name: 'birthDate', required: false, description: 'Fecha de nacimiento exacta (YYYY-MM-DD)' })
  @ApiResponse({ 
    status: 200, 
    description: 'Pacientes encontrados',
    type: [PatientResponseOutDto],
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Debe proporcionar al menos un criterio de búsqueda',
  })
  @ApiResponse({
  status: 404,
  description: 'No se encontraron pacientes con los criterios proporcionados',
  })
  async search(@Query() searchDto: SearchPatientDto): Promise<PatientResponseOutDto[]> {
    return await this.patientsService.search(searchDto);
  }

  // 3. BUSCAR POR ID
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un paciente por ID' })
  @ApiParam({ name: 'id', description: 'ID del paciente', example: 1 })
  @ApiResponse({ 
    status: 200, 
    description: 'Paciente encontrado',
    type: PatientResponseOutDto,
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Paciente no encontrado',
    schema: {
      example: {
        statusCode: 404,
        message: "Paciente con identificador '999' no encontrado",
        error: 'Not Found'
      }
    }
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<PatientResponseOutDto> {
    return await this.patientsService.findOne(id);
  }


    @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un nuevo paciente' })
  @ApiResponse({ 
    status: 201, 
    description: 'Paciente creado exitosamente',
    type: PatientResponseOutDto,
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
  async create(@Body() createPatientDto: CreatePatientDto): Promise<PatientResponseOutDto> {
    return await this.patientsService.create(createPatientDto);
  }


  // ACTUALIZAR PACIENTE
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un paciente existente' })
  @ApiParam({ name: 'id', description: 'ID del paciente a actualizar', example: 18 })
  @ApiResponse({ 
    status: 200, 
    description: 'Paciente actualizado exitosamente',
    type: PatientResponseOutDto,
    schema: {
      example: {
        id: 18,
        firstName: 'Estella María',
        lastName: 'Castañeda Pérez',
        birthDate: '1988-03-11',
        gender: 'Femenino',
        status: 'Seguimiento'
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Datos inválidos o actualización fallida',
    schema: {
      example: {
        statusCode: 400,
        message: ['El género debe ser Masculino, Femenino u Otro'],
        error: 'Bad Request'
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Paciente no encontrado',
    schema: {
      example: {
        statusCode: 404,
        message: "Paciente con identificador '999' no encontrado",
        error: 'Not Found'
      }
    }
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Ya existe otro paciente con esos datos',
    schema: {
      example: {
        statusCode: 409,
        message: 'Ya existe un paciente con el nombre Ana García López y fecha de nacimiento 1990-05-10',
        error: 'Conflict'
      }
    }
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePatientDto: UpdatePatientDto,
  ): Promise<PatientResponseOutDto> {
    return await this.patientsService.update(id, updatePatientDto);
  }

  //DESACTIVAR UN PACIENTE 
  @Patch(':id/desactivate')
@ApiOperation({ summary: 'Desactivar un paciente (cambiar status a Inactivo)' })
@ApiParam({ name: 'id', description: 'ID del paciente a desactivar', example: 18 })
@ApiResponse({ 
  status: 200, 
  description: 'Paciente desactivado exitosamente',
  type: PatientResponseOutDto,
  schema: {
    example: {
      id: 18,
      firstName: 'Estella',
      lastName: 'Castañeda perez',
      birthDate: '1988-03-11',
      gender: 'Femenino',
      status: 'Inactivo'
    }
  }
})
@ApiResponse({ 
  status: 404, 
  description: 'Paciente no encontrado',
  schema: {
    example: {
      statusCode: 404,
      message: "Paciente con identificador '999' no encontrado",
      error: 'Not Found'
    }
  }
})
@ApiResponse({ 
  status: 409, 
  description: 'El paciente ya está inactivo',
  schema: {
    example: {
      statusCode: 409,
      message: "El paciente con ID 18 ya está inactivo",
      error: 'Conflict'
    }
  }
})
async desactivate(
  @Param('id', ParseIntPipe) id: number,
  @Body() deactivatePatientDto: DesactivatePatientDto, 
): Promise<PatientResponseOutDto> {
  return await this.patientsService.desactivate(id, deactivatePatientDto);
}


}
