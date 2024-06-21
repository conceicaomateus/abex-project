import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { jwtConstants } from './auth/constants';
import { RoleGuard } from './auth/roles/roles.guard';
import { ProjectManagerModule } from './project-manager/project-manager.module';
import { ProjectsModule } from './project/project.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    ProjectsModule,
    StudentModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
    ProjectManagerModule,
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
