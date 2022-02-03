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
export class HomePage implements OnInit {
  paneEnabled = true;
  event = {
    id: 1,
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false,
  };
  private subscriptions: Array<Subscription> = [];
  private queryRef: QueryRef<
    GetMonthQuery,
    Exact<{
      yearMonth: string;
    }>
  >;
  yearMonth: string;
  rangeView: string;
  overLap: string;
  range = { startTime: Date.prototype, endTime: Date.prototype };
  public eventSource = [];
  calendar = {
    mode: 'month',
    currentDate: new Date(),
    step: '30',
    queryMode: 'remote' as QueryMode,
  };

  @ViewChild(CalendarComponent) Cal: CalendarComponent;

  constructor(
    private menuCtrl: MenuController,
    private calService: CalendarService
  ) {
    this.yearMonth = this.calendar.currentDate.toISOString().substring(0, 7);
  }

  ionViewDidLoad() {}

  async ngOnInit() {
    let month = await this.calService.getMonth(this.yearMonth);
    let tasks = this.assertDate(month.tasks);
    let projects = this.assertDate(month.projects);
    let events = [...tasks, ...projects];
    this.eventSource = events;
  }

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
  // parseYearMonth(endTime: Date) {
  //   const yearMonth = endTime;
  //   yearMonth.setMonth(yearMonth.getUTCMonth() - 1);
  //   return yearMonth.toISOString().substring(0, 7);
  // }
  // parseYearMonthOverlap(endTime: Date) {
  //   const overlap = endTime;
  //   overlap.setMonth(overlap.getUTCMonth() + 1 );
  //   return overlap.toISOString().substring(0, 7);
  // }

  // onRangeChanged = (ev?: { startTime: Date; endTime: Date }) => {
  //   if (ev) {
  //     console.log(ev);
  //     this.calendar.mode === 'week'
  //       ? (this.yearMonthOverlap = this.parseYearMonthOverlap(ev.endTime))
  //       : (this.yearMonthOverlap = '');
  //     console.log('overlap', this.yearMonthOverlap);
  //     this.yearMonth = this.parseYearMonth(ev.endTime);
  //   }
  //   this.loadEvents(this.yearMonth, this.yearMonthOverlap).then((x) => {
  //     console.log(x);
  //     this.eventSource = x;
  //   });
  // };

  onRangeChanged = (ev?: { startTime: Date; endTime: Date }) => {
    let yearMonth = this.yearMonth;
    let overlap;
    if (ev) {
      const endTime = new Date(ev.endTime.valueOf());
      endTime.setMonth(endTime.getUTCMonth() - 1);
      let test = new Date(endTime.valueOf());
      test.setMonth(test.getUTCMonth() + 1);
      const over = test.toISOString().substring(0, 7);
      overlap = over;
      console.log('overlap', over);
      yearMonth = endTime.toISOString().substring(0, 7);
      console.log(yearMonth);
    }

    this.loadEvents(yearMonth, overlap).then((x) => {
      this.range = ev;
      console.log('param', overlap);
      console.log(x);
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

  resetEvent() {}
  onCurrentDateChanged() {}
  reloadSource(startTime, endTime) {}
  onEventSelected() {}
  parseWeekDate(title: string) {
    if (title.includes(',')) {
      let i = title.indexOf(',');
      return new Date(title.substring(0, i)).toISOString();
    } else return new Date(title).toISOString().substring(0, 7);
  }
  onMonthChange(title: string) {
    this.rangeView = title;
    this.yearMonth = this.parseWeekDate(title);
  }
  onTimeSelected() {}
}
