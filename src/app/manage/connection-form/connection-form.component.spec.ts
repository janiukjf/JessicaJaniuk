/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConnectionService } from '../../services/connection/connection.service';
import { Connection } from '../../models/connection';

import { ConnectionFormComponent } from './connection-form.component';
import { MdInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';

describe('ConnectionFormComponent', () => {
  let component: ConnectionFormComponent;
  let fixture: ComponentFixture<ConnectionFormComponent>;
  let activatedRouteMock = {
    snapshot: {
      params: {
        'id': 5
      }
    }
  };
  let connectionServiceMock = {
    getById: jasmine.createSpy('getById'),
    update: jasmine.createSpy('update'),
    save: jasmine.createSpy('save'),
  };
  let fakeSubscribe = {
    subscribe: jasmine.createSpy('subscribe')
  };
  connectionServiceMock.getById.and.returnValue(fakeSubscribe);
  connectionServiceMock.update.and.returnValue(fakeSubscribe);
  connectionServiceMock.save.and.returnValue(fakeSubscribe);

  beforeEach(async(() => {
    connectionServiceMock.getById.calls.reset();
    connectionServiceMock.update.calls.reset();
    connectionServiceMock.save.calls.reset();
    fakeSubscribe.subscribe.calls.reset();
    TestBed.configureTestingModule({
      declarations: [ ConnectionFormComponent ],
      imports: [
        FormsModule,
        MdInputModule.forRoot()
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: ConnectionService, useValue: connectionServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init', () => {
    spyOn(component, 'getConnection');
    component.ngOnInit();
    expect(component.getConnection).toHaveBeenCalled();
  });

  describe('getConnection', () => {
    it('should get page when an id exists', () => {
      component.id = 5;
      component.getConnection();
      expect(connectionServiceMock.getById).toHaveBeenCalledWith(5);
      expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.populateConnection);
    });

    it('should not get page when no id exists', () => {
      connectionServiceMock.getById.calls.reset();
      fakeSubscribe.subscribe.calls.reset();
      component.id = undefined;
      component.getConnection();
      expect(connectionServiceMock.getById).not.toHaveBeenCalled();
      expect(fakeSubscribe.subscribe).not.toHaveBeenCalledWith(component.populateConnection);
    });
  });

  describe('populateConnection', () => {
    it('should set user if data is present', () => {
      let data = { json: jasmine.createSpy('json') };
      let response = { data: { id: 4, name: 'test' } };
      data.json.and.returnValue(response);
      component.populateConnection(data);
      expect(component.connection.id).toBe(4);
      expect(component.connection.name).toBe('test');
    });
    it('should not set user if data is not present', () => {
      let data = { json: jasmine.createSpy('json') };
      let response = { data: undefined };
      data.json.and.returnValue(response);
      component.populateConnection(data);
      expect(component.connection.id).toBeUndefined();
    });
  });

  describe('addOrEdit', () => {
    it('should be add if id is undefined', () => {
      component.id = undefined;
      expect(component.addOrEdit()).toBe('Add');
    });
    it('should be edit if id is defined', () => {
      component.id = 5;
      expect(component.addOrEdit()).toBe('Edit');
    });
  });

  describe('onSubmit', () => {
    it('should save new page when no id', () => {
      let connection = new Connection('test', '', '', '');
      component.id = undefined;
      component.connection = connection;
      component.onSubmit();
      expect(connectionServiceMock.save).toHaveBeenCalledWith(component.connection);
      expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.saveComplete);
    });
    it('should update existing user when id exists', () => {
      let connection = new Connection('test', '', '', '');
      component.id = 5;
      component.connection = connection;
      component.onSubmit();
      expect(connectionServiceMock.update).toHaveBeenCalledWith(5, component.connection);
      expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.saveComplete);
    });
  });

  it('should set id result on save', () => {
    let data = { json: jasmine.createSpy('json') };
    let response = { data: { id: 6 } };
    data.json.and.returnValue(response);
    component.saving = true;
    component.id = undefined;
    component.saveComplete(data);
    expect(component.saving).toBeFalsy();
    expect(component.id).toBe(6);
  });
});
