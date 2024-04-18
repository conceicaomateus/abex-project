import { Test, TestingModule } from '@nestjs/testing';
import { AccessProfileController } from './access-profile.controller';
import { AccessProfileService } from './access-profile.service';

describe('AccessProfileController', () => {
  let controller: AccessProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccessProfileController],
      providers: [AccessProfileService],
    }).compile();

    controller = module.get<AccessProfileController>(AccessProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
