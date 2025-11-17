import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TumorTypesService } from './tumor-types.service';
import { CreateTumorTypeDto } from './dto/create-tumor-type.dto';
import { UpdateTumorTypeDto } from './dto/update-tumor-type.dto';

@Controller('tumor-types')
export class TumorTypesController {
  constructor(private readonly tumorTypesService: TumorTypesService) {}

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
}
