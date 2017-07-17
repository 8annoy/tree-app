import {combineReducers, ActionReducer} from '@ngrx/store'; 
import {Observable} from "rxjs/Observable"; 
import {compose} from "@ngrx/core"; 
 
import * as fromOperations from '../reducers/operations';

export interface State { operations: fromOperations.State; } 

const reducers = { operations: fromOperations.nodeReducer };

const combinedReducer: ActionReducer<State> = combineReducers(reducers); 

export function reducer(state: any, action: any) {
    return reducers.operations(state, action);
}
