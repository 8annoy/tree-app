import { Component } from '@angular/core';
import { Store } from "@ngrx/store";

import { Observable } from 'rxjs/Observable';

import { TreeModule } from 'angular-tree-component';

import { TreeNode } from "app/models/tree-node.model";
import { State } from 'app/reducers/operations'
import * as operations from './actions/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nodes: TreeNode[];
  opened: boolean;
  constructor(private store: Store<State>) {
    store.select('state').subscribe((state:State) => {
      this.nodes = state.nodes;
    });
    store.dispatch(new operations.LoadNodesAction());
  }

  addNode() {
    this.store.dispatch(new operations.AddNodeAction());
  }

  deleteNode() {
    this.store.dispatch(new operations.DeleteNodeAction());
  }

  updateClicked() {
    this.opened = true;
  }

  updateNode(newName: string) {
    this.opened = false;
    this.store.dispatch(new operations.UpdateNodeAction(newName));
  }

  updateSelection(selectedNodes) {
    this.store.dispatch(new operations.SelectNodeAction(selectedNodes));
  }

  isDisabled(tree) {
    return tree.treeModel.activeNodes.length === 0;
  }
}
