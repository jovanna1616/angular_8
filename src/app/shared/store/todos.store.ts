import { Injectable } from '@angular/core';
import { StoreConfig, EntityState, EntityStore } from '@datorama/akita';
import { Todo } from '../../models/todo';

export interface TodosState extends EntityState<Todo, string> {
  todos: Array<Todo>;
  name: string;
}

export function createInitialState (): TodosState {
  return {
    todos: [
      {
        id: 1,
        title: 'default test',
        userId: 1,
        completed: false
      }
    ],
    name: 'John',
  }
}

@Injectable({
  providedIn: 'root'
})

@StoreConfig({ name: 'todos' })
export class TodosStore extends EntityStore<TodosState> {
  constructor() {
    super(createInitialState());
  }
}

