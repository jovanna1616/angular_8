import { Component, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { TodosQuery } from '../shared/store/todos.query';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[];
  isLoading$ = this.todosQuery.selectLoading();
  name$ = this.todosQuery.name;
  @Output()
  todos$: Observable<Todo[]>;
  

  constructor(
    private todoService: TodoService,
    private todosQuery: TodosQuery
  ) { }

  ngOnInit () {
    this.todoService.getTodos();
    this.todosQuery.selectAll({limitTo: 10}).subscribe(todos => {
      this.todos = todos
    })
  }
}
