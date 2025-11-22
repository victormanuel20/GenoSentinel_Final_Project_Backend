import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTumorTypeDto } from './dto/create-tumor-type.dto';
import { UpdateTumorTypeDto } from './dto/update-tumor-type.dto';
import { TumorType } from './entities/tumor-type.entity';
import { TumorTypeResponseDto } from './dto/TumorTypeResponseDto';
import { TumorTypeAlreadyExistsException } from './exceptions/TumorTypeAlreadyExistsException';
import { TumorTypeNotFoundException } from './exceptions/TumorTypeNotFoundException';
import { EmptyUpdateDataException } from './exceptions/EmptyUpdateDataException ';
import { TumorTypeHasRecordsException } from './exceptions/TumorTypeHasRecordsException';
import { InvalidSearchParamsException } from './exceptions/InvalidSearchParamsException';
import { SearchNotFoundException } from './exceptions/SearchNotFoundEception';
import { SearchTumorTypeInDto } from './dto/SearchTumorTypeInDto';
import { Like } from 'typeorm';


@Injectable()
export class TumorTypesService {

   constructor(
    @InjectRepository(TumorType)
    private readonly tumorTypeRepository: Repository<TumorType>,
  ) {}

  // 1. CREAR TIPO DE TUMOR
  async create(createDto: CreateTumorTypeDto): Promise<TumorTypeResponseDto> {
    // Validar que no exista duplicado
    const existing = await this.tumorTypeRepository.findOne({
      where: { name: createDto.name },
    });

    if (existing) {
      throw new TumorTypeAlreadyExistsException(createDto.name);
    }

    // Crear y guardar
    const tumorType = this.tumorTypeRepository.create(createDto);
    const saved = await this.tumorTypeRepository.save(tumorType);

    return this.toResponseDto(saved);
  }

  // 2. LISTAR TODOS
  async findAll(): Promise<TumorTypeResponseDto[]> {
    const tumorTypes = await this.tumorTypeRepository.find();
    return tumorTypes.map(tt => this.toResponseDto(tt));
  }


  // 3. BUSCAR POR ID
  async findOne(id: number): Promise<TumorTypeResponseDto> {
    const tumorType = await this.tumorTypeRepository.findOne({
      where: { id },
    });

    if (!tumorType) {
      throw new TumorTypeNotFoundException(id);
    }

    return this.toResponseDto(tumorType);
  }

      
    // 4. ACTUALIZAR TIPO DE TUMOR
  async update(id: number, updateDto: UpdateTumorTypeDto): Promise<TumorTypeResponseDto> {
    // 1. Verificar que el tipo de tumor existe
    const existingTumorType = await this.tumorTypeRepository.findOne({
      where: { id },
    });

    if (!existingTumorType) {
      throw new TumorTypeNotFoundException(id);
    }

    // 2. Construir objeto con solo los campos que tienen valor
    const updateData: Partial<TumorType> = {};

    if (updateDto.name !== undefined && updateDto.name.trim() !== '') {
      updateData.name = updateDto.name.trim();
    }

    if (updateDto.systemAffected !== undefined && updateDto.systemAffected.trim() !== '') {
      updateData.systemAffected = updateDto.systemAffected.trim();
    }

    // 3. Validar que hay al menos un campo para actualizar
    if (Object.keys(updateData).length === 0) {
      throw new EmptyUpdateDataException();
    }

    // 4. Si se actualiza el nombre, validar que no exista otro tipo de tumor con ese nombre
    if (updateData.name && updateData.name !== existingTumorType.name) {
      const duplicateTumorType = await this.tumorTypeRepository.findOne({
        where: { name: updateData.name },
      });

      if (duplicateTumorType) {
        throw new TumorTypeAlreadyExistsException(updateData.name);
      }
    }

    // 5. Actualizar solo con los campos válidos
    await this.tumorTypeRepository.update(id, updateData);

    // 6. Retornar el tipo de tumor actualizado
    const updatedTumorType = await this.tumorTypeRepository.findOne({
      where: { id },
    });

    if (!updatedTumorType) {
      throw new TumorTypeNotFoundException(id);
    }

    return this.toResponseDto(updatedTumorType);
  }

  // MÉTODO AUXILIAR
  private toResponseDto(tumorType: TumorType): TumorTypeResponseDto {
    return {
      id: tumorType.id,
      name: tumorType.name,
      systemAffected: tumorType.systemAffected,
    };
  }


  // 5. ELIMINAR TIPO DE TUMOR
async remove(id: number): Promise<{ message: string; success: boolean }> {
  // 1. Verificar que el tipo de tumor existe y cargar sus historias clínicas
  const existingTumorType = await this.tumorTypeRepository.findOne({
    where: { id },
    relations: ['clinicalRecords'], // ← Cargar las historias clínicas asociadas
  });

  if (!existingTumorType) {
    throw new TumorTypeNotFoundException(id);
  }

  // 2. Validar que NO tenga historias clínicas asociadas
  if (existingTumorType.clinicalRecords && existingTumorType.clinicalRecords.length > 0) {
    throw new TumorTypeHasRecordsException(id, existingTumorType.clinicalRecords.length);
  }

  // 3. Eliminar el tipo de tumor
  await this.tumorTypeRepository.remove(existingTumorType);

  return {
    message: `Tipo de tumor con ID ${id} eliminado exitosamente`,
    success: true,
  };
}


// 7. BUSCAR POR CRITERIOS
async search(searchDto: SearchTumorTypeInDto): Promise<TumorTypeResponseDto[]> {
  // 1. Construir objeto con solo los campos que tienen valor
  const searchData: any = {};

  if (searchDto.name !== undefined && searchDto.name.trim() !== '') {
    searchData.name = searchDto.name.trim();
  }

  if (searchDto.systemAffected !== undefined && searchDto.systemAffected.trim() !== '') {
    searchData.systemAffected = searchDto.systemAffected.trim();
  }

  // 2. Validar que hay al menos un criterio
  if (Object.keys(searchData).length === 0) {
    throw new InvalidSearchParamsException();
  }

  // 3. Construir query con búsqueda parcial (LIKE)
  const whereCondition: any = {};

  if (searchData.name) {
    whereCondition.name = Like(`%${searchData.name}%`);
  }

  if (searchData.systemAffected) {
    whereCondition.systemAffected = Like(`%${searchData.systemAffected}%`);
  }

  // 4. Buscar en la BD
  const tumorTypes = await this.tumorTypeRepository.find({
    where: whereCondition,
  });

  // 5. Si no hay resultados → 404
  if (!tumorTypes || tumorTypes.length === 0) {
    throw new SearchNotFoundException(searchDto);
  }

  return tumorTypes.map(tt => this.toResponseDto(tt));
}



 
}
