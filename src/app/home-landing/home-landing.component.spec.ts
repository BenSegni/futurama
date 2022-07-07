import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { UserModule } from '../user/user.module';
import { userMock } from '../user/_mocks/user.mock';

import { HomeLandingComponent } from './home-landing.component';
import { HomeNavigationComponent } from './home-navigation/home-navigation.component';

describe('HomeLandingComponent', () => {
  let component: HomeLandingComponent;
  let fixture: ComponentFixture<HomeLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeLandingComponent, HomeNavigationComponent],
      imports: [HttpClientTestingModule, UserModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Testing assignUser()', () => {
    it('should return an observable of User', () => {
      const spyServiceSet = spyOn(component['userService'], 'set');
      const spyService = spyOn<any>(
        component['userService'],
        'get'
      ).and.returnValue(of(userMock));
      component['assignUser']();
      expect(spyService).toHaveBeenCalled();
      expect(component.userDetail).toBeTruthy();
      expect(spyServiceSet).toHaveBeenCalled();
    });

    it('should throw an error if one exists', () => {
      spyOn(component['userService'], 'get').and.returnValue(
        throwError({ status: 403 })
      );
      const spyConsole = spyOn(console, 'log');
      component['assignUser']();
      expect(component.userDetail).toBeFalsy();
      expect(spyConsole).toHaveBeenCalled();
    });
  });
});
