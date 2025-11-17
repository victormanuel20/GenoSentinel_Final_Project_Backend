import { Test, TestingModule } from '@nestjs/testing';
import { TumorTypesController } from './tumor-types.controller';
import { TumorTypesService } from './tumor-types.service';

describe('TumorTypesController', () => {
  let controller: TumorTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TumorTypesController],
      providers: [TumorTypesService],
    }).compile();

    controller = module.get<TumorTypesController>(TumorTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
