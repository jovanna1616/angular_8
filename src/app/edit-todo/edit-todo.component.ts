import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TodosQuery } from '../../app/shared/store/todos.query';
import isEmpty from 'lodash/isEmpty';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent implements OnInit {
  todo: Todo;
  todoForm = new FormGroup({
    title: new FormControl(''),
    completed: new FormControl('')
  });

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router,
    private todosQuery: TodosQuery
  ) { }

  setControls () {
    if (!isEmpty(this.todo)) {
      this.todoForm.controls.title.setValue(this.todo.title)
      this.todoForm.controls.completed.setValue(this.todo.completed)
    }
  }

  getTodo () {
    const id = this.route.snapshot.paramMap.get('id')
    if (this.todosQuery.hasEntity(id)) {
      this.todo = this.todosQuery.getEntity(id);
      this.setControls();
    } else {
      this.todoService.getTodo(parseInt(id)).subscribe(todo => this.todo = todo)
      this.todosQuery.selectEntity(id).subscribe(todo => {
        this.todo = todo;
        this.setControls();
      })
    }
  }
  onSubmit () {
    const data = { id: this.todo.id, ...this.todoForm.value }
    this.todoService.updateTodo(data).subscribe();
    this.router.navigate(['/']);
  }

  ngOnInit (): void {
    this.getTodo();
  }
}
