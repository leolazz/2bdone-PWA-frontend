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
    this.onRangeChanged(this.range);
  }

  ionViewWillLeave() {
    this.paneEnabled = false;
    this.menuCtrl.close();
  }

  async loadEvents(date: string, overlap?: string) {
    let month = await this.calService.getMonth(date, overlap);
    let tasks = this.assertDate(month.tasks);
    let projects = this.assertDate(month.projects);
    let events = [...tasks, ...projects];
    return events;
  }

  parseDateRange(endTime: Date) {
    const yearMonth = new Date(endTime.valueOf());
    const overlap = new Date(endTime.valueOf());
    yearMonth.setMonth(endTime.getUTCMonth() - 1);
    return {
      yearMonth: yearMonth.toISOString().substring(0, 7),
      overlap: overlap.toISOString().substring(0, 7),
    };
  }

  onRangeChanged = (ev?: { startTime: Date; endTime: Date }) => {
    let yearMonth;
    let overlap;
    if (ev) {
      const endTime = new Date(ev.endTime.valueOf());

      endTime.setMonth(endTime.getUTCMonth() - 1);

      let overlapDate = new Date(endTime.valueOf());

      overlapDate.setMonth(overlapDate.getUTCMonth() + 1);

      const overlapString = overlapDate.toISOString().substring(0, 7);

      overlap = overlapString;

      yearMonth = endTime.toISOString().substring(0, 7);
    }
    let test = this.parseDateRange(ev.endTime);
    this.loadEvents(yearMonth, overlap).then((x) => {
      console.log('yearMonth', test.yearMonth, ' ', yearMonth);
      console.log('overlap', test.overlap, ' ', overlap);
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
