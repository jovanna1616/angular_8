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
  isLoading$ = false;
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
    // since no real DB update check if there is no todos
    // or if there is less than 200 todos(case when comming from edit page)
    if (!this.todosQuery.getCount() || this.todosQuery.getCount() < 200) {
      this.todoService.getTodos();
    }
    this.todosQuery.selectAll({ limitTo: this.limitTo }).subscribe(todos => {
      this.todos = todos
      this.todosCount = this.todosQuery.getCount()
    })
  }

  removeTodo (todo: Todo) {
    this.todoService.removeTodo(todo.id.toString()).subscribe();
  }

  ngOnInit () {
    this.getTodos()
    this.todosQuery.selectLoading().subscribe(isLoading => (this.isLoading$ = isLoading))
  }
}
