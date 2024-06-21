import { IsEmail, IsNotEmpty } from "class-validator";
import { Role } from "src/auth/roles/roles.enum";

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  firstName: string;
  
  lastName: string;

  role: Role;
}
