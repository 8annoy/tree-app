import { Action, ActionReducer } from '@ngrx/store';
import { TreeNode } from '../models/tree-node.model';
import * as operations from '../actions/actions';

export interface State {
  nodes: Array<TreeNode>;
  selection: any;
};

const initialState: State = {
    selection: null,
    nodes: []
};

export function nodeReducer(state = initialState, action: operations.Actions) {
    switch (action.type) {
        case operations.ActionTypes.ADD:
            return Object.assign({}, state, {
                nodes: addNode(state.nodes, state.selection)
            });
        case operations.ActionTypes.UPDATE:
            return Object.assign({}, state, {
                nodes: updateNode(state.nodes, state.selection, action.payload)
            });
        case operations.ActionTypes.DELETE:
            return Object.assign({}, state, {
                nodes: deleteNode(state.nodes, state.selection),
                selection: null
            });
        case operations.ActionTypes.SELECT:
            return Object.assign({}, state, {
                selection: action.payload[0] ? action.payload[0].id : state.selection
            });
        case operations.ActionTypes.LOAD_NODES_COMPLETED:
            return {nodes: action.payload, selection: null};
        default:
            return state;
    }
};

function updateNode(nodes, selection, newName) {
    return nodes.map(node => {
        return Object.assign({}, 
            node, 
            {name: 
                isSelected(node.id, selection) ?
                newName :
                node.name,
            children: updateNode(node.children, selection, newName)});});
}

function deleteNode(nodes, selection) {
    return nodes.filter(node => {return !isSelected(node.id, selection)})
                .map(node => {
                    return Object.assign({}, 
                                        node, 
                                        {children: deleteNode(node.children, selection)})});
}

function addNode(nodes, selection) {
    return nodes.map(node => {
        return Object.assign(
            {}, 
            node, 
            {children: 
                isSelected(node.id, selection) ?
                [...node.children, {id: generateRandom(), name: 'default name', children:[]}] :
                addNode(node.children, selection)});});
}

function isSelected(id, selection) {
    return id === selection;
}

function generateRandom() {
    return Math.floor(Math.random()*1000000000);
}