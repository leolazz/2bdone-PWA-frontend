import { Injectable } from '@angular/core';
import {
  AllTasksLimitGQL,
  AllTasksProjectFormGQL,
  CreateTaskGQL,
  CreateTaskInput,
  GetTaskByIdGQL,
  GetTasksGQL,
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
    private readonly getTasksService: GetTasksGQL
  ) {}

  // async getTasks(limit: number) {
  //   // return this.allTasksLimit.fetch({ limit: limit }).toPromise().then(x => x?.data?.allTasksLimit);
  //   const tasks = await this.allTasksLimitService
  //     .fetch({ limit: limit })
  //     .toPromise();

  //   return tasks?.data?.allTasksLimit;
  // }

  getTasks(limit?: number, offset?: number) {
    return this.getTasksService.fetch({ limit, offset });
  }
  getTasksGQl() {
    return this.getTasksService;
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
