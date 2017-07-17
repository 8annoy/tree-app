import * as actions from './actions';

describe('tree actions', () => {
    it('should return the right action for the requested type', () => {
        assertBasicActions();        
        assertSelectAction();
        assertUpdateAction();
    });

    const assertBasicActions = () => {
        expect(new actions.AddNodeAction().type).toBe(actions.ActionTypes.ADD);
        expect(new actions.DeleteNodeAction().type).toBe(actions.ActionTypes.DELETE);
        expect(new actions.LoadNodesAction().type).toBe(actions.ActionTypes.LOAD_NODES);
    };

    const assertSelectAction = () => {
        let selectAction = new actions.SelectNodeAction([{id: 12}]);
        expect(selectAction.type).toBe(actions.ActionTypes.SELECT);
        expect(selectAction.payload[0].id).toBe(12);
    };

    const assertUpdateAction = () => {
        let updateAction = new actions.UpdateNodeAction("new value");
        expect(updateAction.type).toBe(actions.ActionTypes.UPDATE);
        expect(updateAction.payload).toBe("new value");
    }

});
