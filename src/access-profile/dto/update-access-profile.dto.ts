import { PartialType } from '@nestjs/mapped-types';
import { CreateAccessProfileDto } from './create-access-profile.dto';

export class UpdateAccessProfileDto extends PartialType(CreateAccessProfileDto) {}
