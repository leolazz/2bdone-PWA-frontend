import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from './task-card/task-card.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectCardComponent } from './project-card/project-card.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { RouterModule } from '@angular/router';
import { ProjectDetailsComponent } from './project-details/project-details.component';

@NgModule({
  declarations: [
    TaskCardComponent,
    ProjectCardComponent,
    TaskDetailsComponent,
    ProjectDetailsComponent,
  ],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterModule],
  exports: [
    TaskCardComponent,
    ProjectCardComponent,
    TaskDetailsComponent,
    ProjectDetailsComponent,
  ],
})
export class ComponentsModule {}
