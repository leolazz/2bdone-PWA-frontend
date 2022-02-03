import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
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
import { formatDate } from '@angular/common';

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
    private calService: CalendarService,
    private alertCtrl: AlertController,
    @Inject(LOCALE_ID) private locale: string
  ) {}
  assertDate(
    array: TaskEvent[] | ProjectEvent[]
  ): TaskEvent[] | ProjectEvent[] {
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
  async onEventSelected(event: TaskEvent | ProjectEvent) {
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);
    let alert: HTMLIonAlertElement;
    if (event.__typename == 'TaskEvent') {
      alert = await this.alertCtrl.create({
        header: `Task: ${event.title}`,
        subHeader: event.details,
        message: 'From: ' + start + '<br><br>To: ' + end,
      });
    }
    await alert.present();
  }
  onTimeSelected() {}
}
