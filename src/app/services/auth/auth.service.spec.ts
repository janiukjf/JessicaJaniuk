/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { User } from '../../models/user';
import { StorageService } from '../storage/storage.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, XHRBackend, Response, ResponseOptions } from '@angular/http';

describe('AuthService', () => {
  let MockHttp;
  const fakeSubscribe = {
    subscribe: jasmine.createSpy('subscribe')
  };
  const StorageServiceMock = {
    get: jasmine.createSpy('get'),
    set: jasmine.createSpy('set'),
    remove: jasmine.createSpy('remove')
  };

  beforeEach(() => {
    MockHttp = {
      post: jasmine.createSpy('get')
    };
    MockHttp.post.and.returnValue('stuff');

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: StorageService, useValue: StorageServiceMock },
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useValue: MockHttp
        }
      ]
    });
  });

  it('should ...', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  describe('authenticate', () => {
    it('should get use from cache', inject([AuthService, Http], (service: AuthService, http: Http) => {
      service.apiBaseUrl = 'http://test.url/';
      service.authenticate('test', 'user');
      expect(MockHttp.post).toHaveBeenCalledWith('http://test.url/authenticate', {
        username: 'test',
        password: 'user'
      });
    }));
  });

  it('should get use from cache', inject([AuthService, StorageService], (service: AuthService, storage: StorageService) => {
    StorageServiceMock.get.and.returnValue('{"firstName": "Jessica"}');
    service.getUserFromCache();
    expect(service.user.firstName).toBe('Jessica');
  }));

  it('should not get use from cache when no user in cache',
    inject([AuthService, StorageService], (service: AuthService, storage: StorageService) => {
    service.user = undefined;
    StorageServiceMock.get.and.returnValue(null);
    service.getUserFromCache();
    expect(service.user).toBeUndefined();
  }));

  it('should log out', inject([AuthService], (service: AuthService) => {
    service.logout();
    expect(StorageServiceMock.remove).toHaveBeenCalledWith('user');
    expect(StorageServiceMock.remove).toHaveBeenCalledWith('token');
  }));

  describe('isLoggedIn', () => {

    it('should be logged in when a user is present', inject([AuthService], (service: AuthService) => {
      service.user = new User('', '', '', '', true);
      expect(service.isLoggedIn()).toBeTruthy();
    }));

    it('should not be logged in when no user', inject([AuthService], (service: AuthService) => {
      service.user = undefined;
      expect(service.isLoggedIn()).toBeFalsy();
    }));

  });

  describe('isAdmin', () => {
    it('should be admin when logged in and admin is true', inject([AuthService], (service: AuthService) => {
      service.user = new User('', '', '', '', true);
      expect(service.isAdmin()).toBeTruthy();
    }));

    it('should not be admin when logged in and admin is not true',
        inject([AuthService], (service: AuthService) => {
      service.user = new User('', '', '', '', false);
      expect(service.isAdmin()).toBeFalsy();
    }));

    it('should not be admin when not logged in', inject([AuthService], (service: AuthService) => {
      service.user = undefined;
      expect(service.isAdmin()).toBeFalsy();
    }));
  });
});
