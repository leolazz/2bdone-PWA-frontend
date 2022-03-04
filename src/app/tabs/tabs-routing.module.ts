import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
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
      {
        path: 'projects/add-project',
        loadChildren: () =>
          import('../pages/add-project/add-project.module').then(
            (m) => m.AddProjectPageModule
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
