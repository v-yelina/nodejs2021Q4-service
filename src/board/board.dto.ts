import {
  Length,
  IsUUID,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EColumn } from './column.entity';

export class CreateBoardDto {
  @IsOptional()
  @IsUUID()
  id!: string;

  @Length(5, 50)
  title!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EColumn)
  columns!: EColumn[];
}

export class UpdateBoardDto {
  // @IsOptional()
  // @IsUUID()
  // id!: string;

  @Length(5, 50)
  title!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EColumn)
  columns!: EColumn[];
}
