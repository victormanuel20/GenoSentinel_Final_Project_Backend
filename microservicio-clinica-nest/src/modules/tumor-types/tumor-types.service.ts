import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTumorTypeDto } from './dto/create-tumor-type.dto';
import { UpdateTumorTypeDto } from './dto/update-tumor-type.dto';
import { TumorType } from './entities/tumor-type.entity';
import { TumorTypeResponseDto } from './dto/TumorTypeResponseDto';
import { TumorTypeAlreadyExistsException } from './exceptions/TumorTypeAlreadyExistsException';
import { TumorTypeNotFoundException } from './exceptions/TumorTypeNotFoundException';


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

  // MÉTODO AUXILIAR
  private toResponseDto(tumorType: TumorType): TumorTypeResponseDto {
    return {
      id: tumorType.id,
      name: tumorType.name,
      systemAffected: tumorType.systemAffected,
    };
  }




  /*
  create(createTumorTypeDto: CreateTumorTypeDto) {
    return 'This action adds a new tumorType';
  }

  findAll() {
    return `This action returns all tumorTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tumorType`;
  }

  update(id: number, updateTumorTypeDto: UpdateTumorTypeDto) {
    return `This action updates a #${id} tumorType`;
  }

  remove(id: number) {
    return `This action removes a #${id} tumorType`;
  }

  */
}
