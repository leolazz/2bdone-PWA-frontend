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

  async getProjectsTaskForm() {
    const tasks = await this.allProjectsTaskFormService.fetch().toPromise();
    return tasks?.data?.allProjects;
  }

  getProjectWithTasks() {
    return this.allProjectsWithTasksService.fetch();
  }
  getProjectsTaskFormObservable() {
    return this.allProjectsTaskFormService.fetch();
  }
  createProject(project: CreateProjectDto) {
    return this.createProjectService.mutate(project).toPromise();
  }
}
