import { Controller, Get, Post, Body, Patch, Param, Delete,HttpCode, HttpStatus} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
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
