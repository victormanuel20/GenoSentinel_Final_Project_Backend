import { PartialType } from '@nestjs/mapped-types';
import { CreateTumorTypeDto } from './create-tumor-type.dto';

export class UpdateTumorTypeDto extends PartialType(CreateTumorTypeDto) {}
