import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { NodesService } from '../../services/nodes.service';
import * as operations from '../../actions/actions';
import * as translator from '../../models/translator';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class TreeDataEffects {
  constructor(private _actions: Actions, private nodesService: NodesService) { }
  
  @Effect() updateNodes$ = this._actions.ofType(operations.ActionTypes.UPDATE, operations.ActionTypes.DELETE)
    .switchMap(() => this.nodesService.getLocalNodes()
        .map((nodes) => this.nodesService.updateNodes(translator.translateToServer(nodes))));

  @Effect() loadNodes$ = this._actions.ofType(operations.ActionTypes.LOAD_NODES)
    .switchMap(() => this.nodesService.getNodes()
      .map((nodes) => new operations.LoadNodesCompletedAction(translator.translateFromServer(nodes)))
      .catch(() => Observable.of( new operations.LoadNodesCompletedAction(''))));

}