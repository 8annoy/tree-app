import { TreeNode } from "app/models/tree-node.model";
import { Action } from "@ngrx/store";

export const ActionTypes = {
    ADD: 'Add a node',
    DELETE: 'Delete a node',
    UPDATE: 'Update a node',
    SELECT: 'Change node selection',
    LOAD_NODES: 'Load nodes from server',
    LOAD_NODES_COMPLETED: 'completed loading nodes from server'
};
export class AddNodeAction implements Action {
    type = ActionTypes.ADD;
    constructor(public payload: any = null) { }
}

export class DeleteNodeAction implements Action {
    type = ActionTypes.DELETE;
    constructor(public payload: any = null) {}
}

export class UpdateNodeAction implements Action {
    type = ActionTypes.UPDATE;
    constructor(public payload: any) {}
}

export class SelectNodeAction implements Action {
    type = ActionTypes.SELECT;
    constructor(public payload:any) {}
}

export class LoadNodesAction implements Action {
    type = ActionTypes.LOAD_NODES;
    constructor(public payload:any = null) {}
}

export class LoadNodesCompletedAction implements Action {
    type = ActionTypes.LOAD_NODES_COMPLETED;
    constructor(public payload:any) {}
}
export type Actions = AddNodeAction | DeleteNodeAction | UpdateNodeAction | SelectNodeAction | LoadNodesAction | LoadNodesCompletedAction;
