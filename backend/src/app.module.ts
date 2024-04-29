import { Module } from '@nestjs/common';
import { AccessProfileModule } from './access-profile/access-profile.module';
import { AddressModule } from './address/address.module';
import { PersonModule } from './person/person.module';
import { ProjectsModule } from './projects/projects.module';
import { StudentModule } from './student/student.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ProjectsModule, PersonModule, StudentModule, UserModule, AccessProfileModule, AddressModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
