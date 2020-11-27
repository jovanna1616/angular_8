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
  limitTo = 10;
  isLoading$ = this.todosQuery.selectLoading();
  name$ = this.todosQuery.name;
  loadButtonText = 'Load todos'
  @Output()
  todos$: Observable<Todo[]>;
  todosCount = 0;
  shouldDecrease = false
  

  constructor(
    private todoService: TodoService,
    private todosQuery: TodosQuery
  ) { }

  loadTodos () {
    if ((this.todos.length) == this.todosCount) {
      this.shouldDecrease = true
    }
    if (this.todos.length === 10 && this.shouldDecrease === true) {
      this.shouldDecrease = false
    }
    this.limitTo = this.shouldDecrease ? this.limitTo - 10 : this.limitTo + 10;
    this.todosQuery.selectAll({limitTo: this.limitTo}).subscribe(todos => {
      this.todos = todos
    })
  }

  getTodos () {
    this.todoService.getTodos();
    this.todosQuery.selectAll({ limitTo: this.limitTo }).subscribe(todos => {
      this.todos = todos
      this.todosCount = this.todosQuery.getCount()
    })
  }

  ngOnInit () {
    this.getTodos()
  }
}
