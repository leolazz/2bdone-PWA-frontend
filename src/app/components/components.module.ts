import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from './task-card/task-card.component';
import { IonicModule } from '@ionic/angular';
import { TaskFormComponent } from './task-form/task-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TaskCardComponent, TaskFormComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  exports: [TaskCardComponent, TaskFormComponent],
})
export class ComponentsModule {}
