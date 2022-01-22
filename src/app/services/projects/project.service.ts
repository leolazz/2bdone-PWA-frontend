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
  PaginatedProjectsGQL,
  PaginatedProjectsQueryVariables,
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
    private readonly deleteProjectSerice: DeleteProjectGQL,
    private readonly paginatedProjectsService: PaginatedProjectsGQL
  ) {}

  getPaginatedProjects(pageableOptions: PaginatedProjectsQueryVariables) {
    return this.paginatedProjectsService.watch(pageableOptions, {
      pollInterval: 500,
    });
  }

  deleteProject(deleteProjectInput: DeleteProjectInput) {
    return this.deleteProjectSerice.mutate(deleteProjectInput).toPromise();
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
  getProjectsTaskForm(isCompleted?: boolean) {
    return this.allProjectsTaskFormService.watch({ isCompleted: isCompleted });
  }
  createProject(project: CreateProjectDto) {
    return this.createProjectService.mutate(project).toPromise();
  }
}
