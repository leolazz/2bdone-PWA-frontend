import { Injectable } from '@angular/core';
import { CreateTaskGQL } from '../../../generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceService {
  constructor(private readonly createTaskGQlService: CreateTaskGQL) {}
}
