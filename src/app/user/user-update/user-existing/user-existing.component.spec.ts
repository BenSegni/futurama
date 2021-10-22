import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserExistingComponent } from './user-existing.component';

describe('UserExistingComponent', () => {
  let component: UserExistingComponent;
  let fixture: ComponentFixture<UserExistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserExistingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserExistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
