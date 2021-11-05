import { Injectable } from '@angular/core';
import {
  AllTasksLimitGQL,
  CreateTaskGQL,
  CreateTaskDto,
} from '../../../generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(
    private readonly createTaskGQlService: CreateTaskGQL,
    private readonly allTasksLimitService: AllTasksLimitGQL
  ) {}

  async getTasks(limit: number) {
    // return this.allTasksLimit.fetch({ limit: limit }).toPromise().then(x => x?.data?.allTasksLimit);
    const tasks = await this.allTasksLimitService
      .fetch({ limit: limit })
      .toPromise();

    return tasks?.data?.allTasksLimit;
  }
  getTasksObservable(limit: number) {
    return this.allTasksLimitService.fetch({ limit });
  }

  async createTask(task: CreateTaskDto) {
    return this.createTaskGQlService.mutate(task).toPromise();
  }
}
