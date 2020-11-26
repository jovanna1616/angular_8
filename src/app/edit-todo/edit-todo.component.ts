import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  getTodo () {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.todoService.getTodo(id).subscribe(todo => {
      this.todo = todo
    })
  }
  onSubmit () {
    console.log('SUBMITING data', this.todo)
    const data = {
      id: this.todo.id,
      userId: this.todo.id,
      title: 'testing',
      completed: true,
    }
    this.todoService.updateTodo(data);
    this.router.navigate(['/']);
  }

  ngOnInit (): void {
    this.getTodo();
    console.log('TEST', this.todo)
    // this.todoForm.controls.title.setValue('ASFDSF')
  }

}
