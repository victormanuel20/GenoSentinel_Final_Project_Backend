import { Repository } from 'typeorm';
import { CreateTumorTypeDto } from './dto/create-tumor-type.dto';
import { UpdateTumorTypeDto } from './dto/update-tumor-type.dto';
import { TumorType } from './entities/tumor-type.entity';
import { TumorTypeResponseDto } from './dto/TumorTypeResponseDto';
import { SearchTumorTypeInDto } from './dto/SearchTumorTypeInDto';
export declare class TumorTypesService {
    private readonly tumorTypeRepository;
    constructor(tumorTypeRepository: Repository<TumorType>);
    create(createDto: CreateTumorTypeDto): Promise<TumorTypeResponseDto>;
    findAll(): Promise<TumorTypeResponseDto[]>;
    findOne(id: number): Promise<TumorTypeResponseDto>;
    update(id: number, updateDto: UpdateTumorTypeDto): Promise<TumorTypeResponseDto>;
    private toResponseDto;
    remove(id: number): Promise<{
        message: string;
        success: boolean;
    }>;
    search(searchDto: SearchTumorTypeInDto): Promise<TumorTypeResponseDto[]>;
}
