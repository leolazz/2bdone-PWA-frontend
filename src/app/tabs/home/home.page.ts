import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'home-tab',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  paneEnabled = true;
  constructor(private menuCtrl: MenuController) {}

  ionViewWillEnter() {
    this.paneEnabled = true;
    this.menuCtrl.enable(true, 'home');
  }
  ionViewWillLeave() {
    this.paneEnabled = false;
  }
}
