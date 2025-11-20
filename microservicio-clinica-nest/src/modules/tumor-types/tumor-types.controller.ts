import { Controller, Get, Post, Body, Patch, Param, Delete,HttpCode, HttpStatus,ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse,ApiParam } from '@nestjs/swagger';
import { TumorTypesService } from './tumor-types.service';
import { TumorTypeResponseDto } from './dto/TumorTypeResponseDto';
import { CreateTumorTypeDto } from './dto/create-tumor-type.dto';
import { UpdateTumorTypeDto } from './dto/update-tumor-type.dto';

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
    type: TumorTypeResponseDto,
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Ya existe un tipo de tumor con ese nombre',
  })
  async create(@Body() createDto: CreateTumorTypeDto): Promise<TumorTypeResponseDto> {
    return await this.tumorTypesService.create(createDto);
  }

  // 2. LISTAR TODOS
  @Get()
  @ApiOperation({ summary: 'Obtener todos los tipos de tumor' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de tipos de tumor',
    type: [TumorTypeResponseDto],
  })
  async findAll(): Promise<TumorTypeResponseDto[]> {
    return await this.tumorTypesService.findAll();
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
    type: TumorTypeResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Tipo de tumor no encontrado',
  })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TumorTypeResponseDto> {
    return await this.tumorTypesService.findOne(id);
  }


    // 4. ACTUALIZAR
    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar un tipo de tumor existente' })
    @ApiParam({ name: 'id', description: 'ID del tipo de tumor a actualizar', example: 1 })
    @ApiResponse({ 
      status: 200, 
      description: 'Tipo de tumor actualizado exitosamente',
      type: TumorTypeResponseDto,
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
      @Body() updateDto: UpdateTumorTypeDto,
    ): Promise<TumorTypeResponseDto> {
      return await this.tumorTypesService.update(id, updateDto);
    }




  /*
  @Post()
  create(@Body() createTumorTypeDto: CreateTumorTypeDto) {
    return this.tumorTypesService.create(createTumorTypeDto);
  }

  @Get()
  findAll() {
    return this.tumorTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tumorTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTumorTypeDto: UpdateTumorTypeDto) {
    return this.tumorTypesService.update(+id, updateTumorTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tumorTypesService.remove(+id);
  }
    */
}
