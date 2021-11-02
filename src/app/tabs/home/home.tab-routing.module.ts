import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskPage } from '../tasks/task.component';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeTabRoutingModule {}
