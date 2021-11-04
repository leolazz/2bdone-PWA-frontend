import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskPage } from '../../pages/add-task/add-task.page';
import { TaskPage } from './task.component';

const routes: Routes = [
  {
    path: '',
    component: TaskPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskTabRoutingModule {}
