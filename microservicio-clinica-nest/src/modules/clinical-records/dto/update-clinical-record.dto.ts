import { PartialType } from '@nestjs/mapped-types';
import { CreateClinicalRecordInDto } from './create-clinical-record-in.dto';

export class UpdateClinicalRecordDto extends PartialType(CreateClinicalRecordInDto) {}
