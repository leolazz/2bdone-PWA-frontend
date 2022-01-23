import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectPage } from './project.page';
import { ProjectTabRoutingModule } from './projects.tab-routing.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ProjectTabRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
  declarations: [ProjectPage],
})
export class ProjectPageModule {}
