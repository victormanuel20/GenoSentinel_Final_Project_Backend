import { Injectable } from '@nestjs/common';
import { CreateTumorTypeDto } from './dto/create-tumor-type.dto';
import { UpdateTumorTypeDto } from './dto/update-tumor-type.dto';

@Injectable()
export class TumorTypesService {
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
}
