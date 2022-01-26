import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';

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
  today;
  eventSource = [];
  calendar = {
    mode: 'month',
    currentDate: new Date(),
    step: '30',
  };
  minDate = new Date().toISOString();
  @ViewChild(CalendarComponent) Cal: CalendarComponent;
  constructor(private menuCtrl: MenuController) {}
  resetEvent() {}
  ngOnInit() {}

  ionViewWillEnter() {
    this.paneEnabled = true;
    this.menuCtrl.enable(true, 'home');
  }
  ionViewWillLeave() {
    this.paneEnabled = false;
    this.menuCtrl.close();
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
  onCurrentDateChanged() {}
  reloadSource(startTime, endTime) {}
  onEventSelected() {}
  onViewTitleChanged(title) {
    this.today = title;
  }
  onTimeSelected() {}
}
