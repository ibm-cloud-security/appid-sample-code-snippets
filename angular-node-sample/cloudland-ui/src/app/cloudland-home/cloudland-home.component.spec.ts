import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudlandHomeComponent } from './cloudland-home.component';

describe('CloudlandHomeComponent', () => {
  let component: CloudlandHomeComponent;
  let fixture: ComponentFixture<CloudlandHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloudlandHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudlandHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
