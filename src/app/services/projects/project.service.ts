import { Injectable } from '@angular/core';
import { AllProjectsTaskFormGQL } from '../../../generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(
    private readonly allProjectsTaskFormService: AllProjectsTaskFormGQL
  ) {}

  async getProjectsTaskForm() {
    const tasks = await this.allProjectsTaskFormService.fetch().toPromise();

    return tasks?.data?.allProjects;
  }
  getProjectsTaskFormObservable() {
    return this.allProjectsTaskFormService.fetch();
  }
}
