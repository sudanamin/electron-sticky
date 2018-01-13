import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpComponentComponent } from './exp-component.component';

describe('ExpComponentComponent', () => {
  let component: ExpComponentComponent;
  let fixture: ComponentFixture<ExpComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
