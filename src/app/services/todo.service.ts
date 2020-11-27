import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { TodosStore } from '../shared/store/todos.store';
import { TodosQuery } from '../shared/store/todos.query';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosBaseUrl = 'https://jsonplaceholder.typicode.com/todos';
  // private todosBaseUrl = 'http://127.0.0.1:8000/api/todos';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
  };
  
  constructor(
    private http: HttpClient,
    private todosStore: TodosStore,
    private todosQuery: TodosQuery
  ) { }

  getTodos () {
    this.todosStore.setLoading(true)
    return this.http.get<Todo[]>(this.todosBaseUrl)
      .pipe(
        tap(todos => {
          this.todosStore.set(todos);
          this.todosStore.setLoading(false)
        }),
        catchError(this.handleError<Todo[]>('getTodos', []))
      ).subscribe();
  }

  getTodo (id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.todosBaseUrl}/${id}`)
      .pipe(
        tap(
          todo => {
            this.todosStore.add(todo);
            this.todosStore.setLoading(false)
          }
        ),
        catchError(this.handleError<Todo>(`Unable to get todo by id: ${id}`))
      );
  }

  updateTodo (todo: Todo): Observable<Todo> {
    return this.http.patch<Todo>(`${this.todosBaseUrl}/${todo.id}`, todo, this.httpOptions)
      .pipe(
        tap(
          todo => {
            this.todosStore.update(todo.id.toString(), { ...todo });
          }
        ),
        catchError(this.handleError<Todo>(`Unable to get todo by id: ${todo.id}`))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
