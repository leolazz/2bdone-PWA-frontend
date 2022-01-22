import { Injectable } from '@angular/core';
import {
  AllTasksLimitGQL,
  AllTasksProjectFormGQL,
  CreateTaskDto,
  CreateTaskGQL,
  CreateTaskInput,
  DeleteTaskGQL,
  GetTaskByIdGQL,
  PaginatedTasksGQL,
  PaginatedTasksQueryVariables,
  UpdateTaskGQL,
} from '../../../graphql/generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(
    private readonly createTaskGQlService: CreateTaskGQL,
    private readonly allTasksLimitService: AllTasksLimitGQL,
    private readonly allTasksProjectFormService: AllTasksProjectFormGQL,
    private readonly getTaskByid: GetTaskByIdGQL,
    private readonly updateTaskService: UpdateTaskGQL,
    private readonly paginatedTasksService: PaginatedTasksGQL,
    private readonly deleteTaskService: DeleteTaskGQL
  ) {}

  async deleteTask(id: number) {
    return this.deleteTaskService.mutate({ id }).toPromise();
  }
  async updateTask(task: CreateTaskDto) {
    return await this.updateTaskService
      .mutate({ ...task, id: task.id })
      .toPromise();
  }
  getPaginatedTasks(pageableOptions: PaginatedTasksQueryVariables) {
    return this.paginatedTasksService.watch(pageableOptions, {
      pollInterval: 500,
    });
  }

  getOneById(id: number) {
    return this.getTaskByid.fetch({ id });
  }
  getTasksObservable(limit: number) {
    return this.allTasksLimitService.fetch({ limit });
  }

  async createTask(task: CreateTaskInput) {
    return this.createTaskGQlService.mutate(task).toPromise();
  }

  getTasksProjectForm() {
    return this.allTasksProjectFormService.watch();
  }
}
