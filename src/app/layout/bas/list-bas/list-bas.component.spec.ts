import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBasComponent } from './list-bas.component';

describe('ListBasComponent', () => {
  let component: ListBasComponent;
  let fixture: ComponentFixture<ListBasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
