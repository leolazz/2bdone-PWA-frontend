import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectPage } from './project.page';
import { ProjectTabRoutingModule } from './projects.tab-routing.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, ProjectTabRoutingModule],
  declarations: [ProjectPage],
})
export class ProjectPageModule {}
