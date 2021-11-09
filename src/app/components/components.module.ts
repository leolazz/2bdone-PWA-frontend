import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from './task-card/task-card.component';
import { IonicModule } from '@ionic/angular';
import { TaskFormComponent } from './task-form/task-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TaskCardComponent,
    TaskFormComponent,
    ProjectFormComponent,
    ProjectCardComponent,
    TaskDetailsComponent,
  ],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterModule],
  exports: [
    TaskCardComponent,
    TaskFormComponent,
    ProjectFormComponent,
    ProjectCardComponent,
    TaskDetailsComponent,
  ],
})
export class ComponentsModule {}
