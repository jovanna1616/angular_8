import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosBaseUrl = 'https://jsonplaceholder.typicode.com/todos';
  // private todosBaseUrl = 'http://127.0.0.1:8000/api/todos';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
  };
  
  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosBaseUrl)
      .pipe(
        catchError(this.handleError<Todo[]>('getTodos', []))
      );
  }

  getTodo (id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.todosBaseUrl}/${id}`)
      .pipe(
        catchError(this.handleError<Todo>(`Unable to get todo by id: ${id}`))
      );
  }

  updateTodo (todo: Todo): Observable<Todo> {
    console.log('UPDATE TODO', todo)
    return this.http.put<Todo>(`${this.todosBaseUrl}/${todo.id}`, todo, this.httpOptions)
      .pipe(
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
