import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdItemsComponent } from './ad-items.component';

describe('AdItemsComponent', () => {
  let component: AdItemsComponent;
  let fixture: ComponentFixture<AdItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdItemsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
