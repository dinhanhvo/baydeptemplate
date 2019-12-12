import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasComponent } from './bas.component';

describe('BasComponent', () => {
  let component: BasComponent;
  let fixture: ComponentFixture<BasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
