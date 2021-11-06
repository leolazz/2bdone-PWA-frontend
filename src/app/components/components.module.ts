import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from './task-card/task-card.component';
import { IonicModule } from '@ionic/angular';
import { TaskFormComponent } from './task-form/task-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectFormComponent } from './project-form/project-form.component';

@NgModule({
  declarations: [TaskCardComponent, TaskFormComponent, ProjectFormComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  exports: [TaskCardComponent, TaskFormComponent, ProjectFormComponent],
})
export class ComponentsModule {}
