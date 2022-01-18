import { Injectable } from '@angular/core';
import {
  AllProjectsTaskFormGQL,
  CreateProjectGQL,
  AllProjectsWithTasksGQL,
  CreateProjectDto,
  GetProjectByIdGQL,
  UpdateProjectGQL,
  UpdateProjectDto,
  DeleteProjectGQL,
  DeleteProjectInput,
} from '../../../graphql/generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(
    private readonly allProjectsTaskFormService: AllProjectsTaskFormGQL,
    private readonly createProjectService: CreateProjectGQL,
    private readonly allProjectsWithTasksService: AllProjectsWithTasksGQL,
    private readonly getProjectByIdService: GetProjectByIdGQL,
    private readonly updateProjectService: UpdateProjectGQL,
    private readonly deleteProjectSerice: DeleteProjectGQL
  ) {}

  deleteProject(deleteProjectInput: DeleteProjectInput) {
    return this.deleteProjectSerice.mutate(deleteProjectInput).toPromise();
  }

  async getProjectsTaskForm(isCompleted?: boolean) {
    // graphql query has default value of false
    const tasks = await this.allProjectsTaskFormService
      .fetch({ isCompleted: isCompleted })
      .toPromise();
    return tasks?.data?.allProjects;
  }
  getOneById(id: number) {
    return this.getProjectByIdService.fetch({ id });
  }
  async updateProject(project: UpdateProjectDto) {
    return await this.updateProjectService.mutate(project).toPromise();
  }
  getProjectWithTasks(isCompleted?: boolean) {
    return this.allProjectsWithTasksService.fetch({ isCompleted });
  }
  getProjectsTaskFormObservable(isCompleted?: boolean) {
    return this.allProjectsTaskFormService.fetch({ isCompleted: isCompleted });
  }
  createProject(project: CreateProjectDto) {
    return this.createProjectService.mutate(project).toPromise();
  }
}
