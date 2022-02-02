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
    this.onRangeChanged();
  }
  ionViewWillLeave() {
    this.paneEnabled = false;
    this.menuCtrl.close();
  }

  async loadEvents(date: string) {
    console.log('loadevents', this.yearMonth);
    let month = await this.calService.getMonth(date);
    let tasks = this.assertDate(month.tasks);
    let projects = this.assertDate(month.projects);
    let events = [...tasks, ...projects];
    console.log('load stuff');
    // this.eventSource = events;
    return events;
    console.log('cal event source', this.Cal.eventSource);
  }

  onRangeChanged = (ev?: { startTime: Date; endTime: Date }) => {
    if (ev) {
      const endTime = ev.endTime;
      endTime.setMonth(endTime.getUTCMonth() - 1);
      const yearMonth = endTime.toISOString().substring(0, 7);
      this.yearMonth = yearMonth;
    }
    this.loadEvents(this.yearMonth).then((x) => {
      console.log(this.yearMonth);
      console.log('hello', x);
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
