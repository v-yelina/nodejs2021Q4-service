import { Length, IsNumber, IsUUID, IsOptional } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @Length(3, 50)
  title!: string;

  @IsOptional()
  boardId!: string;

  @IsNumber()
  order!: number;

  description!: string;

  @IsOptional()
  userId!: string;

  @IsOptional()
  columnId!: string;
}
