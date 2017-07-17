// import { AppComponent } from './app.component';
// import { MockStore } from './services/mock.store';
// import { ComponentFixture, async, TestBed } from '@angular/core/testing';
// import { DebugElement } from '@angular/core';
// import { By } from '@angular/platform-browser';
// import { Store } from '@ngrx/store';
// import { TreeModule } from 'angular-tree-component';
// import { ClarityModule } from "clarity-angular";

// describe('AppComponent', () => {
//   let component: AppComponent;
//   let fixture: ComponentFixture<AppComponent>;
//   let de: DebugElement;
//   let _titleEl: HTMLElement;
//   let _tagListEl: HTMLElement;
//   let _store: any;  // MockStore<{tags: string[]}>;
  
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ AppComponent ],
//       imports: [ TreeModule, ClarityModule.forRoot() ],
//       providers:[
//         {provide: Store, useValue: new MockStore({nodes: [], selection: null})}
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(AppComponent);
//     _store = fixture.debugElement.injector.get(Store);
//     component = fixture.componentInstance;
//     // query for the title <h1> by CSS element selector
//     de = fixture.debugElement.query(By..css('button'));
//     console.log(de);
//     _titleEl = de.nativeElement;
//     _tagListEl = fixture.debugElement.query(By.css('md-list')).nativeElement;
//   }));
//   it('Display Tags title', () => {
//     fixture.detectChanges();
//     expect(_titleEl.textContent).toContain("Tags");
//   });
//   it('Tag Count', () => {
//     // _store.next({tags: tagList});
//     fixture.detectChanges();
//     // expect(_tagListEl.childElementCount).toEqual(tagList.length);
//   });
//   it('Tag List Contains', () => {
//     // _store.next({tags: tagList});
//     fixture.detectChanges();
//     [].forEach(t =>{
//       expect(_tagListEl.textContent).toContain(t);
//     })
//   });
// });

import { AppComponent } from './app.component';
import { MockStore } from './services/mock.store';
import { TreeNode } from './models/tree-node.model';
import { State } from './reducers/operations';
import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { ClarityModule } from "clarity-angular";
import { TreeModule } from 'angular-tree-component';
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';
import * as actions from './actions/actions';
describe('app component', () => {
    let mockStore: MockStore<State>;
    let mockData: State = {nodes: [{id: 233, name: 'mockName', children: []}], selection: null};
    let app: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(() => {
        mockStore = new MockStore(mockData);
        spyOn(mockStore, 'select').and.returnValue(Observable.of(mockData));
        spyOn(mockStore, 'dispatch');

        TestBed.configureTestingModule({
            declarations: [ AppComponent ],
            imports: [TreeModule, ClarityModule.forRoot()],
            providers:[
                {provide: Store, useValue: mockStore}
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        app = fixture.componentInstance;
    });

    it('Should get nodes on init', () => {
        expect(app.nodes).toEqual(mockData.nodes);
    });

    it('should disable all 3 buttons when no nodes are selected', () => {
        let buttons =   fixture.debugElement.queryAll(By.css('.btn')).map((element) => {return element.nativeElement;});
        expect(buttons.length).toBe(3);
        buttons.forEach((button) => {
            expect(button.disabled).toBe(true);
        });
    });

    it('should dispatch change on selection', () => {
        let selectedNode = [{id: 3, name: 'some node', children: []}];
        app.updateSelection(selectedNode);
        expect(mockStore.dispatch).toHaveBeenCalledWith(new actions.SelectNodeAction(selectedNode));
    });

    it('should dispatch change on add node', () => {
        app.addNode();
        expect(mockStore.dispatch).toHaveBeenCalledWith(new actions.AddNodeAction());
    });

    it('should dispatch change on delete node', () => {
        app.deleteNode();
        expect(mockStore.dispatch).toHaveBeenCalledWith(new actions.DeleteNodeAction());
    });

    it('should dispatch change on update node', () => {
        app.updateNode('new name');
        expect(mockStore.dispatch).toHaveBeenCalledWith(new actions.UpdateNodeAction('new name'));
    });
});