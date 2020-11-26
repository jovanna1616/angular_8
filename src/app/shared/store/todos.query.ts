import { QueryEntity, combineQueries } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { TodosState, TodosStore } from './todos.store';

@Injectable()
export class TodosQuery extends QueryEntity<TodosState> {
  constructor(protected store: TodosStore) {
    super(store)
  }
  // observable
  name$ = this.select(state => state.name);
  // raw value
  get name () {
    return this.store.getValue().name
  }
}
