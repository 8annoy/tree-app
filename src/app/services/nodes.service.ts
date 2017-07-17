import { Http, Headers} from '@angular/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { State } from '../reducers/operations';
import { TreeNode } from '../models/tree-node.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class NodesService {

  nodes: Array<TreeNode>;

  constructor(private http: Http, private store: Store<State>) {
    store.select('state').subscribe((state:State) => {
      this.nodes = state.nodes;
    });
  }

  getNodes() {
    return this.http.get('/api/nodes').map(res => res.json());
  }

  getLocalNodes() {
    return Observable.of(this.nodes ? this.nodes : []);
  }

  updateNodes(nodes) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('/api/nodes/', nodes, {headers: headers}).subscribe();
  }

}
