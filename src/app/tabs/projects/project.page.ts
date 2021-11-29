import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AllProjectsWithTasksQuery } from '../../../graphql/generated/graphql';

import { ProjectService } from '../../services/projects/project.service';

@Component({
  selector: 'project-tab',
  templateUrl: 'project.page.html',
  styleUrls: ['project.page.scss'],
})
export class ProjectPage implements OnInit, OnDestroy {
  private projectsLoading: boolean = false;
  public projects: AllProjectsWithTasksQuery['allProjects'] = [];
  private subscriptions: Array<Subscription> = [];
  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.projectService.getProjectWithTasks(true).subscribe((x) => {
        this.projectsLoading = x.loading;
        this.projects = x?.data.allProjects;
      })
    );
  }
  ngOnDestroy() {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
}
