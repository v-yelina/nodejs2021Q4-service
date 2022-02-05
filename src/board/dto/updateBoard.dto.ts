import { Length, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { EColumn } from '../column.entity';

export class UpdateBoardDto {
  @Length(5, 30)
  title!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EColumn)
  columns!: EColumn[];
}
