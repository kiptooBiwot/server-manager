import { PartialType } from '@nestjs/swagger';
import { CreateRemoteServerDto } from './create-remote-server.dto';
import { IsObject, IsOptional, IsString } from 'class-validator';

export class UpdateRemoteServerDto extends PartialType(CreateRemoteServerDto) {
  @IsString()
  @IsOptional()
  name?: string;

  // ownerId!: string

  @IsOptional()
  @IsString()
  description?: string;

  @IsObject()
  @IsOptional()
  config?: Record<string, any>;
}
