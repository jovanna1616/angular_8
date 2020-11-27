import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Router } from '@angular/router';
import isEmpty from 'lodash/isEmpty';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  @Input() todo: Todo;
  todoForm = new FormGroup({
    title: new FormControl(''),
    completed: new FormControl('')
  });

  constructor(
    private todoService: TodoService,
    private router: Router,
  ) { }

  setControls () {
    if (!isEmpty(this.todo)) {
      this.todoForm.controls.title.setValue(this.todo.title)
      this.todoForm.controls.completed.setValue(this.todo.completed)
    }
  }

  onSubmit () {
    const shouldUpdateTodo = this.todo && this.todo.id
    const data = { id: shouldUpdateTodo ? this.todo.id : null, ...this.todoForm.value }
    shouldUpdateTodo ?
      this.todoService.updateTodo(data).subscribe() :
      this.todoService.createNewTodo(data).subscribe();
    
    this.router.navigate(['/']);
  }

  ngOnInit (): void {
    this.setControls();
  }
}
