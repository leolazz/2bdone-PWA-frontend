import { Injectable } from '@angular/core';
import {
  AllTasksLimitGQL,
  AllTasksProjectFormGQL,
  CreateTaskDto,
  CreateTaskGQL,
  CreateTaskInput,
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
    private readonly paginatedTasksService: PaginatedTasksGQL
  ) {}

  async updateTask(task: CreateTaskDto) {
    return await this.updateTaskService
      .mutate({ ...task, id: task.id })
      .toPromise();
  }
  getPaginatedTasks(pageableOptions: PaginatedTasksQueryVariables) {
    return this.paginatedTasksService.watch(pageableOptions);
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

  getTasksProjectFormObservable() {
    return this.allTasksProjectFormService.fetch();
  }
}
