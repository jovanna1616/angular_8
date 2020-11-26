import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

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
  ) { }

  getTodo () {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.todoService.getTodo(id).subscribe(todo => this.todo = todo)
  }

  ngOnInit (): void {
    this.getTodo()
  }

}
