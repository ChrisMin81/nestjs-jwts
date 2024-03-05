import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ITodo, IUpdateTodo, IUpsertTodo } from '@fst/shared/domain';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreateTodoDto implements Pick<ITodo, 'title' | 'description'> {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;
}

export class UpsertTodoDto implements IUpsertTodo {
  
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsBoolean()
  completed!: boolean;

  @IsString()
  @IsNotEmpty()
  description!: string;


  @IsString()
  @IsNotEmpty()
  title!: string;
  //
}

export class UpdateTodoDto implements IUpdateTodo {
  //
}
