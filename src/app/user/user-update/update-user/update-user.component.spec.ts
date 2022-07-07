import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { userMock } from '../../_mocks/user.mock';
import { UserExistingComponent } from '../user-existing/user-existing.component';

import { UpdateUserComponent } from './update-user.component';

describe('UpdateUserComponent', () => {
  let component: UpdateUserComponent;
  let fixture: ComponentFixture<UpdateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateUserComponent, UserExistingComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Testing onSubmit()', () => {
    it('should save userDetails and call setLoggedUser', () => {
      const spyLogger = spyOn<any>(component, 'setLoggedUser');
      component.userForm.patchValue(userMock);
      component.onSubmit(component.userForm);
      expect(component.userDetail).toEqual(component.userForm.value);
      expect(spyLogger).toHaveBeenCalled();
    });

    it('should return if form is invalid', () => {
      const spyLogger = spyOn<any>(component, 'setLoggedUser');
      component.userForm.patchValue({ ...userMock, jobRole: null });
      component.onSubmit(component.userForm);
      expect(spyLogger).not.toHaveBeenCalled();
    });
  });

  describe('Testing cancel()', () => {
    it('should set userDetail and navigate away', () => {
      component.userDetail = userMock;
      const spyRouter = spyOn(component['router'], 'navigate');
      component.cancel();
      expect(component.userForm.value).toEqual(component.userDetail);
      expect(spyRouter).toHaveBeenCalled();
    });
  });

  describe('Testing maintainUserFormState()', () => {
    beforeEach(() => {
      component['persistUserState'] = true;
    });
    it('should create a form if persistUserState is true', fakeAsync(() => {
      spyOn<any>(component, 'createForm').and.callThrough();
      component['maintainUserFormState']();
      tick(100);
      fixture.detectChanges();
      expect(component.userForm).toBeTruthy();
    }));
  });

  describe('Testing creatForm()', () => {
    beforeEach(() => {
      component.userDetail = userMock;
    });
    it('set form value of existing user if user exists', () => {
      component.ngOnInit();

      expect(component.userForm).toBeTruthy();
      expect(component.userForm.value).toEqual(userMock);
    });
  });
});
