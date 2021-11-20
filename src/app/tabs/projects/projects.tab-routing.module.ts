import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDetailsComponent } from '../../components/project-details/project-details.component';
import { ProjectPage } from './project.page';

const routes: Routes = [
  {
    path: '',
    component: ProjectPage,
  },
  {
    path: 'details/:id',
    component: ProjectDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectTabRoutingModule {}
