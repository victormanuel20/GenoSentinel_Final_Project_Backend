import { Controller, Get, Post, Body, Patch, Param, Delete,HttpCode, HttpStatus,ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse,ApiParam,ApiQuery} from '@nestjs/swagger';
import { TumorTypesService } from './tumor-types.service';
import { TumorTypeResponseOutDto } from './dto/TumorTypeResponse-outDto';
import { CreateTumorTypeInDto } from './dto/create-tumor-type-in.dto';
import { UpdateTumorTypeInDto } from './dto/update-tumor-type-in.dto';
import { SearchTumorTypeInDto } from './dto/SearchTumorTypeInDto';
import { Query } from '@nestjs/common';


@ApiTags('Tipos de Tumor')
@Controller('tumor-types')
export class TumorTypesController {
  constructor(private readonly tumorTypesService: TumorTypesService) {}

  // 1. CREAR
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un nuevo tipo de tumor' })
  @ApiResponse({ 
    status: 201, 
    description: 'Tipo de tumor creado exitosamente',
    type: TumorTypeResponseOutDto,
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Ya existe un tipo de tumor con ese nombre',
  })
  async create(@Body() createDto: CreateTumorTypeInDto): Promise<TumorTypeResponseOutDto> {
    return await this.tumorTypesService.create(createDto);
  }

  // 2. LISTAR TODOS
  @Get()
  @ApiOperation({ summary: 'Obtener todos los tipos de tumor' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de tipos de tumor',
    type: [TumorTypeResponseOutDto],
  })
  async findAll(): Promise<TumorTypeResponseOutDto[]> {
    return await this.tumorTypesService.findAll();
  }

    // 7. BUSCAR POR CRITERIOS (
  @Get('search')
  @ApiOperation({ summary: 'Buscar tipos de tumor por nombre o sistema afectado' })
  @ApiQuery({ name: 'name', required: false, description: 'Nombre del tipo de tumor (búsqueda parcial)' })
  @ApiQuery({ name: 'systemAffected', required: false, description: 'Sistema afectado (búsqueda parcial)' })
  @ApiResponse({ 
    status: 200, 
    description: 'Tipos de tumor encontrados',
    type: [TumorTypeResponseOutDto],
    schema: {
      example: [
        {
          id: 1,
          name: 'Cáncer de mama',
          systemAffected: 'Glándulas'
        }
      ]
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Debe proporcionar al menos un criterio de búsqueda',
    schema: {
      example: {
        statusCode: 400,
        message: 'Debe proporcionar al menos un criterio de búsqueda: name o systemAffected',
        error: 'Bad Request'
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'No se encontraron tipos de tumor con los criterios proporcionados',
    schema: {
      example: {
        statusCode: 404,
        message: 'No se encontraron tipos de tumor con los criterios: nombre: "NoExiste"',
        error: 'Not Found'
      }
    }
  })
  async search(@Query() searchDto: SearchTumorTypeInDto): Promise<TumorTypeResponseOutDto[]> {
    return await this.tumorTypesService.search(searchDto);
  }


  //Listar solo por ID

    // GET /tumor-types/:id
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un tipo de tumor por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del tipo de tumor',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Tipo de tumor encontrado',
    type: TumorTypeResponseOutDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Tipo de tumor no encontrado',
  })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TumorTypeResponseOutDto> {
    return await this.tumorTypesService.findOne(id);
  }


    // 4. ACTUALIZAR
    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar un tipo de tumor existente' })
    @ApiParam({ name: 'id', description: 'ID del tipo de tumor a actualizar', example: 1 })
    @ApiResponse({ 
      status: 200, 
      description: 'Tipo de tumor actualizado exitosamente',
      type: TumorTypeResponseOutDto,
      schema: {
        example: {
          id: 1,
          name: 'Cáncer de mama triple negativo',
          systemAffected: 'Glándulas mamarias'
        }
      }
    })
    @ApiResponse({ 
      status: 400, 
      description: 'Datos inválidos o body vacío',
      schema: {
        examples: {
          emptyBody: {
            value: {
              statusCode: 400,
              message: 'Debe proporcionar al menos un campo para actualizar (name o systemAffected)',
              error: 'Bad Request'
            }
          },
          emptyFields: {
            value: {
              statusCode: 400,
              message: ['El nombre es obligatorio', 'El sistema afectado es obligatorio'],
              error: 'Bad Request'
            }
          }
        }
      }
    })
    @ApiResponse({ 
      status: 404, 
      description: 'Tipo de tumor no encontrado',
      schema: {
        example: {
          statusCode: 404,
          message: 'Tipo de tumor con ID 999 no encontrado',
          error: 'Not Found'
        }
      }
    })
    @ApiResponse({ 
      status: 409, 
      description: 'Ya existe otro tipo de tumor con ese nombre',
      schema: {
        example: {
          statusCode: 409,
          message: 'Ya existe un tipo de tumor con el nombre "Cáncer de pulmón"',
          error: 'Conflict'
        }
      }
    })
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateDto: UpdateTumorTypeInDto,
    ): Promise<TumorTypeResponseOutDto> {
      return await this.tumorTypesService.update(id, updateDto);
    }


      // 5. ELIMINAR
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un tipo de tumor' })
  @ApiParam({ name: 'id', description: 'ID del tipo de tumor a eliminar', example: 4 })
  @ApiResponse({ 
    status: 200, 
    description: 'Tipo de tumor eliminado exitosamente',
    schema: {
      example: {
        message: 'Tipo de tumor con ID 4 eliminado exitosamente',
        success: true
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Tipo de tumor no encontrado',
    schema: {
      example: {
        statusCode: 404,
        message: 'Tipo de tumor con ID 999 no encontrado',
        error: 'Not Found'
      }
    }
  })
  @ApiResponse({ 
    status: 409, 
    description: 'No se puede eliminar porque tiene historias clínicas asociadas',
    schema: {
      example: {
        statusCode: 409,
        message: 'No se puede eliminar el tipo de tumor con ID 1 porque tiene 1 historia(s) clínica(s) asociada(s)',
        error: 'Conflict'
      }
    }
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string; success: boolean }> {
    return await this.tumorTypesService.remove(id);
  }







}
