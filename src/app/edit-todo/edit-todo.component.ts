import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { ActivatedRoute } from '@angular/router';
import { TodosQuery } from '../../app/shared/store/todos.query';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent implements OnInit {
  todo: Todo;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private todosQuery: TodosQuery
  ) { }

  getTodo () {
    const id = this.route.snapshot.paramMap.get('id')
    if (this.todosQuery.hasEntity(id)) {
      this.todo = this.todosQuery.getEntity(id);
    } else {
      this.todoService.getTodo(parseInt(id)).subscribe(todo => this.todo = todo)
      this.todosQuery.selectEntity(id).subscribe(todo => {
        this.todo = todo;
      })
    }
  }

  ngOnInit (): void {
    this.getTodo();
  }
}
