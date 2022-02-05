import { Length, IsNumber, IsUUID, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @Length(3, 50)
  title!: string;

  @IsOptional()
  boardId!: string | null;

  @IsNumber()
  order!: number;

  description!: string;

  @IsOptional()
  userId!: string | null;

  @IsOptional()
  columnId!: string | null;
}
