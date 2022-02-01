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
  today;

  public eventSource: GetMonthQuery['getMonth'];
  calendar = {
    mode: 'month',
    currentDate: new Date(),
    step: '30',
    queryMode: 'remote' as QueryMode,
  };
  minDate = new Date().toISOString();
  @ViewChild(CalendarComponent) Cal: CalendarComponent;
  constructor(
    private menuCtrl: MenuController,
    private calService: CalendarService
  ) {}
  ngOnInit() {
    // this.queryRef = this.calService.getMonth(this.yearMonth);
    // this.subscriptions.push(
    //   this.queryRef.valueChanges.subscribe((x) => {
    //     this.eventSource = x.data.getMonth;
    //   })
    // );
  }

  ionViewWillEnter() {
    this.paneEnabled = true;
    this.menuCtrl.enable(true, 'home');
  }
  ionViewWillLeave() {
    this.paneEnabled = false;
    this.menuCtrl.close();
  }

  onRangeChanged(ev: { startTime: Date; endTime: Date }) {}
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
  onMonthChange(title) {
    this.today = title;
  }
  onTimeSelected() {}
}
