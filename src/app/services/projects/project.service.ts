import { Injectable } from '@angular/core';
import {
  AllProjectsTaskFormGQL,
  CreateProjectGQL,
  AllProjectsWithTasksGQL,
  CreateProjectDto,
} from '../../../graphql/generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(
    private readonly allProjectsTaskFormService: AllProjectsTaskFormGQL,
    private readonly createProjectService: CreateProjectGQL,
    private readonly allProjectsWithTasksService: AllProjectsWithTasksGQL
  ) {}

  async getProjectsTaskForm(isCompleted?: boolean) {
    // graphql query has default value of false
    const tasks = await this.allProjectsTaskFormService
      .fetch({ isCompleted: isCompleted })
      .toPromise();
    return tasks?.data?.allProjects;
  }

  getProjectWithTasks() {
    return this.allProjectsWithTasksService.fetch();
  }
  getProjectsTaskFormObservable(isCompleted?: boolean) {
    return this.allProjectsTaskFormService.fetch({ isCompleted: isCompleted });
  }
  createProject(project: CreateProjectDto) {
    return this.createProjectService.mutate(project).toPromise();
  }
}
