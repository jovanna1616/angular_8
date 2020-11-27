import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { TodosQuery } from '../../app/shared/store/todos.query';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {

  todo: Todo;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private todosQuery: TodosQuery
  ) { }

  getTodo () {
    const id = this.route.snapshot.paramMap.get('id')
    if (this.todosQuery.hasEntity(id)) {
      this.todo = this.todosQuery.getEntity(id)
    } else {
      this.todoService.getTodo(parseInt(id)).subscribe(todo => this.todo = todo)
    }
  }

  ngOnInit (): void {
    this.getTodo()
  }
}
