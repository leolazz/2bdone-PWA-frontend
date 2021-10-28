import { Injectable } from '@angular/core';
import { CreateTaskWithoutProjectGQL } from '../../../generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceService {
  constructor(
    private readonly createTaskGQlService: CreateTaskWithoutProjectGQL
  ) {}
}
