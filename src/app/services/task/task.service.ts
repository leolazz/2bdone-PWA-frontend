import { Injectable } from '@angular/core';
import {
  AllTasksLimitGQL,
  AllTasksProjectFormGQL,
  CreateTaskGQL,
  CreateTaskInput,
  GetTaskByIdGQL,
  // GetTasksGQL,
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
    // private readonly getTasksService: GetTasksGQL,
    private readonly updateTaskService: UpdateTaskGQL,
    private readonly paginatedTasksService: PaginatedTasksGQL
  ) {}
  // async getTasks(limit: number) {
  //   // return this.allTasksLimit.fetch({ limit: limit }).toPromise().then(x => x?.data?.allTasksLimit);
  //   const tasks = await this.allTasksLimitService
  //     .fetch({ limit: limit })
  //     .toPromise();

  //   return tasks?.data?.allTasksLimit;
  // }

  updateTask(task: {
    id: number;
    title: string;
    createdDate: string;
    endDate: string;
    isCompleted: boolean;
    details?: string;
    outcomes?: string;
  }) {
    return this.updateTaskService.mutate(task).toPromise();
  }
  getPaginatedTasks(pageableOptions: PaginatedTasksQueryVariables) {
    return this.paginatedTasksService.watch(pageableOptions);
  }
  // getTasks(limit?: number, offset?: number) {
  //   return this.getTasksService.fetch({ limit, offset });
  // }
  // getTasksWatch(limit?: number, offset?: number) {
  //   return this.getTasksService.watch({ limit, offset });
  // }
  // getTasksGQl() {
  //   return this.getTasksService;
  // }

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
