import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupViewMenuAddonComponent } from './group-view-menu-addon.component';

describe('GroupViewMenuAddonComponent', () => {
  let component: GroupViewMenuAddonComponent;
  let fixture: ComponentFixture<GroupViewMenuAddonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupViewMenuAddonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupViewMenuAddonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
