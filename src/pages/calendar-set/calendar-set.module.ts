import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarSetPage } from './calendar-set';

@NgModule({
  declarations: [
    CalendarSetPage,
  ],
  imports: [
    IonicPageModule.forChild(CalendarSetPage),
  ],
})
export class CalendarSetPageModule {}
