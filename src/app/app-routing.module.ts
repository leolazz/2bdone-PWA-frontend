import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'add-task',
    loadChildren: () =>
      import('./pages/add-task/add-task.module').then(
        (m) => m.AddTaskPageModule
      ),
  },
  {
    path: 'add-project',
    loadChildren: () => import('./pages/add-project/add-project.module').then( m => m.AddProjectPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
