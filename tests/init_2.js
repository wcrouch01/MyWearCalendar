import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from '../src/app/app.component';
import {
  PlatformMock,
  StatusBarMock,
  SplashScreenMock
} from '../test-config/mocks-ionic';

describe('MyApp Component', () => {
    let component;

    beforeEach((() => {
  
      TestBed.configureTestingModule({
        declarations: [Component]
      })
        .compileComponents();
    }));
  
    beforeEach(() => {
      const fixture = TestBed.createComponent(Component);
      component = fixture.componentInstance;
    });
  
    it('should have a defined component', () => {
      expect(component).toBeDefined();
    });
  
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    afterAll(() => {
      TestBed.resetTestingModule();
    });

});