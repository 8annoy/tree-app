import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { mapTo } from 'rxjs/operator/mapTo';
export class MockStore<T> extends BehaviorSubject<T> {  
  constructor(private _initialState: T) {
    super(_initialState);
  }
  dispatch = (action: Action): void => {
  }
  
  select = <T, R>(pathOrMapFn: any, ...paths: string[]): Observable<R> => {
    return mapTo.call(this, pathOrMapFn);
  }
}