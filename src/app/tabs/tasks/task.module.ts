import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TaskPage } from './task.component';
import { TaskTabRoutingModule } from './tasks.tab-routing.module';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskTabRoutingModule,
    ComponentsModule,
  ],
  declarations: [TaskPage],
  exports: [TaskPage],
})
export class TaskPageModule {
  constructor() {}
}
