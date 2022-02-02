import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';
import { CalendarService } from '../../services/calendar/calendar.service';
import { Subscription } from 'rxjs';
import { QueryRef } from 'apollo-angular';
import { QueryMode } from 'ionic2-calendar/calendar';
import { GetMonthQuery, Exact } from '../../../graphql/generated/graphql';

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
    this.yearMonth = this.calendar.currentDate.toISOString().substring(0, 6);
  }
  ngOnInit() {
    console.log(this.yearMonth);
    this.queryRef = this.calService.getMonth(this.yearMonth);
    this.subscriptions.push(
      this.queryRef.valueChanges.subscribe((x) => {
        this.eventSource = [
          ...x.data?.getMonth?.projects,
          ...x.data?.getMonth?.tasks,
          console.log(x.data.getMonth),
        ];
      })
    );
  }

  ionViewWillEnter() {
    this.paneEnabled = true;
    this.menuCtrl.enable(true, 'home');
  }
  ionViewWillLeave() {
    this.paneEnabled = false;
    this.menuCtrl.close();
  }

  dateRangeIso(startTime: Date, endTime: Date) {
    return {
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
    };
  }

  onRangeChanged(ev: { startTime: Date; endTime: Date }) {
    // const dateRange = this.dateRangeIso(ev.startTime, ev.endTime);
    this.queryRef.refetch({ yearMonth: this.yearMonth });
    console.log(this.eventSource);
  }
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
    } else return new Date(title).toISOString();
  }
  onMonthChange(title: string) {
    this.rangeView = title;
    this.yearMonth = this.parseWeekDate(title);
  }
  onTimeSelected() {}
}
