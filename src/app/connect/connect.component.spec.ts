/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConnectComponent } from './connect.component';
import { AngularFire } from 'angularfire2';
import { Title }     from '@angular/platform-browser';

describe('ConnectComponent', () => {
  let component: ConnectComponent;
  let fixture: ComponentFixture<ConnectComponent>;
  let TitleServiceMock = {
    setTitle: jasmine.createSpy('setTitle')
  };
  let fbObject = { subscribe: jasmine.createSpy('subscribe') };
  let fbList = { subscribe: jasmine.createSpy('subscribe') };

  beforeEach(async(() => {
    let AngularFireStub = {
      database: {
        object: () => fbObject,
        list: () => fbList
      }
    };

    TestBed.configureTestingModule({
      declarations: [ ConnectComponent ],
      providers: [
        { provide: AngularFire, useValue: AngularFireStub },
        { provide: Title, useValue: TitleServiceMock },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.page).toBe(fbObject);
    expect(component.items).toBe(fbList);
    expect(fbObject.subscribe).toHaveBeenCalledWith(component.handlePage);
  });

  it('should handle page data', () => {
    let pageData = { $value: 'content' };
    component.handlePage(pageData);
    expect(component.body).toBe('content');
    expect(component.show).toBeTruthy();
  });

  it('should ngOnInit', () => {
    component.ngOnInit();
    expect(TitleServiceMock.setTitle).toHaveBeenCalledWith('Connect | Jessica Janiuk');
  });
});
