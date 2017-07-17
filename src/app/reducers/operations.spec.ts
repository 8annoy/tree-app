import * as actions from '../actions/actions';
import * as operations from './operations';

const state = {nodes: [{id: 1, name: 'node', children: []}], selection: 1};

describe('tree operations reducer', () => {
    
    it('should update state with loaded nodes', () => {
        expect(operations.nodeReducer({nodes:[], selection: 1}, new actions.LoadNodesCompletedAction(state.nodes)))
            .toEqual(Object.assign({}, state, {selection: null}));
    });

    it('should add a child to the selected node', () => {
        const actual = operations.nodeReducer(state, new actions.AddNodeAction());
        const expected = {nodes: [{id: 1, name: 'node', children: [{id: actual.nodes[0].children[0].id, name: 'default name', children: []}]}], selection: 1};
        expect(actual).toEqual(expected);
    });
    
    it('should delete the selected node', () => {
        expect(operations.nodeReducer(state, new actions.DeleteNodeAction()))
            .toEqual({nodes: [], selection: null});
    });

    it('should delete the selected node and all its children', () => {
        let stateWithParentSelected = operations.nodeReducer(state, new actions.AddNodeAction());
        expect(operations.nodeReducer(stateWithParentSelected, new actions.DeleteNodeAction()))
            .toEqual({nodes: [], selection: null});
    });

    it('should rename the selected node', () => {
        const actual = operations.nodeReducer(state, new actions.UpdateNodeAction('new name'));
        expect(actual.nodes[0].name).toEqual('new name');
    });

    it('should update node selection', () => {
        let actual = operations.nodeReducer(state, new actions.SelectNodeAction([{id:null}]));
        expect(actual.selection).toBeNull;
        expect(operations.nodeReducer(actual, new actions.SelectNodeAction([{id: 42}])).selection).toBe(42);
    });
})