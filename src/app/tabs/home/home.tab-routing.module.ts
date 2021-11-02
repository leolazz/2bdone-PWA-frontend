import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskPage } from '../tasks/task.component';

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
export class HomeTabRoutingModule {}
