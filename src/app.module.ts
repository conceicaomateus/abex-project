import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { PersonModule } from './person/person.module';
import { StudentModule } from './student/student.module';
import { UserModule } from './user/user.module';
import { AccessProfileModule } from './access-profile/access-profile.module';

@Module({
  imports: [ProjectsModule, PersonModule, StudentModule, UserModule, AccessProfileModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
