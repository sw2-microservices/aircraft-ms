import { IsString, IsNotEmpty, IsInt, IsOptional, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAircraftDto {
  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  registration: string;

  @Type(() => Number)
  @IsInt()
  seatsTotal: number;

  @IsOptional()
  @IsObject()
  configuration?: Record<string, any>;
}
