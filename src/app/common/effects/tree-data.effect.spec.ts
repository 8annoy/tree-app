import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import {Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { TreeDataEffects } from './tree-data.effect';
import * as operations from '../../actions/actions';
import { NodesService } from '../../services/nodes.service';
import {translateToServer} from '../../models/translator';
describe('Tree Data Effects', () => {
  const stubbedNodes = [{id: 11, name: 'name', children: []}];
  
  let runner: EffectsRunner;
  let treeDataEffects: TreeDataEffects;
  let nodesService: NodesService;
  
  beforeEach(() => TestBed.configureTestingModule({
      imports: [ EffectsTestingModule ],
      providers: [
          TreeDataEffects,
          {
              provide: NodesService,
              useValue: {
                  getNodes: () => { return Observable.of(stubbedNodes);},
                  getLocalNodes: () => { return Observable.of(stubbedNodes);},
                  updateNodes: (nodes) => {return Observable.of(stubbedNodes);}}}]
  }));
  
  it('should call Load Nodes Success action after Load Nodes',
    inject([ EffectsRunner, TreeDataEffects, NodesService ], (_runner, _treeDataEffects, _nodesService) => {
        runner = _runner;
        treeDataEffects = _treeDataEffects;
        nodesService = _nodesService;
    
        runner.queue({ type: operations.ActionTypes.LOAD_NODES });
        treeDataEffects.loadNodes$.subscribe(result => {
            expect(result.type).toEqual(operations.ActionTypes.LOAD_NODES_COMPLETED);
            expect(result.payload.length).toEqual(1);
            expect(result.payload).toEqual(stubbedNodes);
        });
    })
  );

  it('should update service with local nodes', 
    inject([ EffectsRunner, TreeDataEffects, NodesService ], (_runner, _treeDataEffects, _nodesService) => {
        runner = _runner;
        treeDataEffects = _treeDataEffects;
        nodesService = _nodesService;
        
        runner.queue({ type: operations.ActionTypes.UPDATE });
        spyOn(nodesService, "updateNodes");
        treeDataEffects.updateNodes$.subscribe(result => {
            expect(nodesService.updateNodes).toHaveBeenCalledWith(translateToServer(stubbedNodes));
        });
    })
  );
});