import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskDetailsComponent } from '../../components/task-details/task-details.component';

import { TaskPage } from './task.component';

const routes: Routes = [
  {
    path: '',
    component: TaskPage,
  },
  {
    path: 'details/:id',
    component: TaskDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskTabRoutingModule {}
