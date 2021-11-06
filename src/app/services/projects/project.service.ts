import { Injectable } from '@angular/core';
import {
  AllProjectsTaskFormGQL,
  CreateProjectDto,
  CreateProjectGQL,
} from '../../../generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(
    private readonly allProjectsTaskFormService: AllProjectsTaskFormGQL,
    private readonly createProjectService: CreateProjectGQL
  ) {}

  async getProjectsTaskForm() {
    const tasks = await this.allProjectsTaskFormService.fetch().toPromise();

    return tasks?.data?.allProjects;
  }
  getProjectsTaskFormObservable() {
    return this.allProjectsTaskFormService.fetch();
  }
  createProject(project: CreateProjectDto) {
    return this.createProjectService.mutate(project).toPromise();
  }
}
