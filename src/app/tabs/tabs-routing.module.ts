import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskPage } from '../pages/add-task/add-task.page';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'tasks',
        loadChildren: () =>
          import('./tasks/task.module').then((m) => m.TaskPageModule),
      },
      {
        path: 'projects',
        loadChildren: () =>
          import('./projects/project.module').then((m) => m.ProjectPageModule),
      },
      {
        path: 'tasks/add-task',
        loadChildren: () =>
          import('../pages/add-task/add-task.module').then(
            (m) => m.AddTaskPageModule
          ),
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
