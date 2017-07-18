import { TestBed, inject } from '@angular/core/testing';
import { Http, BaseRequestOptions, ResponseOptions, Response, Request, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { NodesService } from './nodes.service';
import { State } from '../reducers/operations';
import { Store } from '@ngrx/store';
import { MockStore } from './mock.store';
import { Observable } from 'rxjs/Observable';

describe ('nodes service', () => {
  let mockStore: MockStore<State>;
  let mockData: State = {nodes: [{id: 233, name: 'mockName', children: []}], selection: null};
  let service: NodesService;
  let backend: MockBackend;

  beforeEach(() => {
    mockStore = new MockStore(mockData);
    spyOn(mockStore, 'select').and.returnValue(Observable.of(mockData));
    TestBed.configureTestingModule({
      providers: [
        MockBackend,
        NodesService,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        {
          provide: Store,
          useValue: mockStore
        }
      ]
    }).compileComponents();
  });

  beforeEach(inject([NodesService, MockBackend], (nodesService: NodesService, mockBackend: MockBackend) => {
    service = nodesService;
    backend = mockBackend;
  }));

  it('should call endpoint and return its result', (done) => {
    let mockResponse = {result: 'blabla'};
    backend.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions({
        body: mockResponse
      });
      connection.mockRespond(new Response(options));
    });

    service.getNodes()
      .subscribe((response) => {
        expect(response).toEqual(mockResponse);
        done();
      });
  });

  it('should get nodes from local state', (done) => {
    service.getLocalNodes().subscribe((res) => {
      expect(mockStore.select).toHaveBeenCalled();
      expect(res).toEqual(mockData.nodes);
      done();
    });
  });

  it('should call PUT with local nodes on update', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Put);
      expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
      expect(connection.request.url).toEqual('/api/nodes/');
      expect(JSON.parse(connection.request.getBody())).toEqual(mockData.nodes);
    });
    service.updateNodes(mockData.nodes);
    done();
  });  
});
