import { Injectable } from '@angular/core';
import { CreateTaskDto, CreateTaskGQL } from '../../../generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceService {
  constructor(private readonly createTaskGQlService: CreateTaskGQL) {}

  async createTask(createTaskInput: CreateTaskDto) {
    const task = await this.createTaskGQlService
      .mutate(createTaskInput)
      .toPromise();
    return task?.data?.createTask;
  }
}
