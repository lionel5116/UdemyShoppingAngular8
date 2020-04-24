import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestHTTPComponent } from './test-http.component';

describe('TestHTTPComponent', () => {
  let component: TestHTTPComponent;
  let fixture: ComponentFixture<TestHTTPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestHTTPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHTTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
