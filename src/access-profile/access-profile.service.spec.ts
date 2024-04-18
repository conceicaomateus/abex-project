import { Test, TestingModule } from '@nestjs/testing';
import { AccessProfileService } from './access-profile.service';

describe('AccessProfileService', () => {
  let service: AccessProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccessProfileService],
    }).compile();

    service = module.get<AccessProfileService>(AccessProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
