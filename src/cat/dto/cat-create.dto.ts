// import { Type } from '@nestjs/common';
import {
  IsString,
  IsNumberString,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateCatDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly age?: number;

  @IsString()
  readonly breed: string;
}
