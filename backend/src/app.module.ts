import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AccessProfileModule } from './access-profile/access-profile.module';
import { AddressModule } from './address/address.module';
import { AuthModule } from './auth/auth.module';
import { jwtConstants } from './auth/constants';
import { RoleGuard } from './auth/roles/roles.guard';
import { ProjectsModule } from './projects/projects.module';
import { StudentModule } from './student/student.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ProjectsModule,
    StudentModule,
    UserModule,
    AccessProfileModule,
    AddressModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
    AuthModule,
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
