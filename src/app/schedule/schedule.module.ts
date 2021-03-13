import { NgModule } from '@angular/core';
import { ScheduleComponent } from './schedule.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { scheduleRoutes } from './schedule.route';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [ScheduleComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(scheduleRoutes),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })],
  providers: [DatePipe]
})
export class ScheduleModule { }
