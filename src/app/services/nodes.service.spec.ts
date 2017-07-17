import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { NodesService } from './nodes.service';
import { Store } from '@ngrx/store';
import { MockStore } from './mock.store';

describe('NodesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NodesService, 
        MockBackend,
        {provide:Store, useValue: new MockStore({tags: []})},
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    }).compileComponents();
  });

  it('should ...', inject([NodesService], (service: NodesService) => {
    // spyOn(Http, "get").and.returnValue([]);
    // expect(service.getNodes()).toBe("---");
  }));
});
