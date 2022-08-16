import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Todo } from '../entities/todo.entity';
import { CreateDto, UpdateDto } from './dto';
import { TodoService } from '../services/todo.service';
import { FindOneOptions } from 'typeorm';

@Controller('api/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get()
  getAllAction(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  getOneAction(@Param('id') id: FindOneOptions): Promise<Todo> {
    return this.todoService.findOne(id);
  }

  @Post()
  createAction(@Body() createDto: CreateDto): Promise<Todo> {
    const todo = new Todo();
    todo.title = createDto.title;
    if (createDto.isCompleted !== undefined) {
      todo.isCompleted = createDto.isCompleted;
    }
    return this.todoService.create(todo);
  }

  // @Put(':id')
  // async updateAction(
  //   @Param('id') id: string,
  //   @Body() { title, isCompleted }: UpdateDto,
  // ): Promise<Todo> {
  //   const todo = await this.todoService.findOne(id);
  //   todo.title = title;
  //   todo.isCompleted = isCompleted;
  //   return this.todoService.update(todo);
  // }

  @Delete(':id')
  deleteAction(@Param('id') id: string): Promise<void> {
    return this.todoService.remove(id);
  }
}
