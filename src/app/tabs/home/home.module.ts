import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { HomeTabRoutingModule } from './home.tab-routing.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, HomeTabRoutingModule],
  declarations: [HomePage],
})
export class HomePageModule {}
