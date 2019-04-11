import {TestBed} from '@angular/core/testing';
import {IonicModule} from 'ionic-angular/index';
import {ConfigService} from "./config-service";

describe('ConfigService', () => {
    let configService: ConfigService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [
                IonicModule.forRoot(ConfigService)
            ],
            providers: [
                ConfigService
              ]
          });
      }));

      beforeEach(() => {
          configService = TestBed.get(ConfigService);
      });

      it('should create service', () => expect(configService).toBeDefined());
  });
