import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';
import { CalendarService } from '../../services/calendar/calendar.service';
import { Subscription } from 'rxjs';
import { QueryRef } from 'apollo-angular';
import { QueryMode } from 'ionic2-calendar/calendar';
import {
  GetMonthQuery,
  Exact,
  TaskEvent,
  ProjectEvent,
} from '../../../graphql/generated/graphql';

@Component({
  selector: 'home-tab',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  paneEnabled = true;
  public rangeView: string;
  public range = { startTime: Date.prototype, endTime: Date.prototype };
  public eventSource = [];
  public calendar = {
    mode: 'month',
    currentDate: new Date(),
    step: '30',
    queryMode: 'remote' as QueryMode,
  };
  constructor(
    private menuCtrl: MenuController,
    private calService: CalendarService
  ) {}
  assertDate(array: TaskEvent[] | ProjectEvent[]): any {
    const dateCorrected = array.map((x) => ({ ...x }));
    dateCorrected.map((x) => {
      x.endTime = new Date(x.endTime);
      x.startTime = new Date(x.startTime);
    });
    return dateCorrected;
  }

  ionViewWillEnter() {
    this.paneEnabled = true;
    this.menuCtrl.enable(true, 'home');
    console.log(this.range);
    this.onRangeChanged(this.range);
  }

  ionViewWillLeave() {
    this.paneEnabled = false;
    this.menuCtrl.close();
  }

  async loadEvents(yearMonth: string, yearMonthOverlap?: string) {
    let month = await this.calService.getMonth(yearMonth, yearMonthOverlap);
    let tasks = this.assertDate(month.tasks);
    let projects = this.assertDate(month.projects);
    let events = [...tasks, ...projects];
    return events;
  }

  parseDateRange(endTime: Date) {
    const yearMonth = new Date(endTime.valueOf());
    const yearMonthOverlap = new Date(endTime.valueOf());
    yearMonth.setMonth(endTime.getUTCMonth() - 1);
    return {
      yearMonth: yearMonth.toISOString().substring(0, 7),
      yearMonthOverlap: yearMonthOverlap.toISOString().substring(0, 7),
    };
  }

  onRangeChanged = (ev: { startTime: Date; endTime: Date }) => {
    let calendarOptions = this.parseDateRange(ev.endTime);
    this.loadEvents(
      calendarOptions.yearMonth,
      calendarOptions.yearMonthOverlap
    ).then((x) => {
      this.range = ev;
      this.eventSource = x;
    });
  };

  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }
  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }
  changeMode(mode: string) {
    this.calendar.mode = mode;
  }
  onMonthChange(title: string) {
    this.rangeView = title;
  }
  resetEvent() {}
  onCurrentDateChanged() {}
  onEventSelected() {}
  onTimeSelected() {}
}
