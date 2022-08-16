import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from "typeorm";
import { Todo } from '../entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async findOne(id: FindOneOptions): Promise<Todo> {
    return this.todoRepository.findOne(id);
  }

  create(todo: Todo): Promise<Todo> {
    delete todo.id;
    return this.todoRepository.save(todo);
  }

  async update(todo: any): Promise<Todo> {
    const loadedTodo = await this.todoRepository.findOneOrFail(todo.id);
    loadedTodo.title = todo.title;
    loadedTodo.isCompleted = todo.isCompleted;
    return this.todoRepository.save(loadedTodo);
  }

  async remove(id: string): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
