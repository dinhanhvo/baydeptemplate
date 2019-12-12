import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdFoldersComponent } from './ad-folders.component';

describe('AdFoldersComponent', () => {
  let component: AdFoldersComponent;
  let fixture: ComponentFixture<AdFoldersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdFoldersComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdFoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
