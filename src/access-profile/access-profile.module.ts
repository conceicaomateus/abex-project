import { Module } from '@nestjs/common';
import { AccessProfileService } from './access-profile.service';
import { AccessProfileController } from './access-profile.controller';

@Module({
  controllers: [AccessProfileController],
  providers: [AccessProfileService],
})
export class AccessProfileModule {}
