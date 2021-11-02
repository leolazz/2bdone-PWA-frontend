import { Injectable } from '@angular/core';
import { AllTasksLimitGQL, CreateTaskGQL } from '../../../generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(
    private readonly createTaskGQlService: CreateTaskGQL,
    private readonly allTasksLimit: AllTasksLimitGQL
  ) {}

  async getTasks(limit: number) {
    // return this.allTasksLimit.fetch({ limit: limit }).toPromise().then(x => x?.data?.allTasksLimit);
    const tasks = await this.allTasksLimit.fetch({ limit: limit }).toPromise();

    return tasks?.data?.allTasksLimit;
  }
  getTasksObservable(limit: number) {
    return this.allTasksLimit.fetch({ limit });
  }
}
