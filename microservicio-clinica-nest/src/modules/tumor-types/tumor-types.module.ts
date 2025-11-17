import { Module } from '@nestjs/common';
import { TumorTypesService } from './tumor-types.service';
import { TumorTypesController } from './tumor-types.controller';

@Module({
  controllers: [TumorTypesController],
  providers: [TumorTypesService],
})
export class TumorTypesModule {}
