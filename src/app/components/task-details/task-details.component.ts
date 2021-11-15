import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApolloQueryResult } from 'apollo-client';
import { Observable, Subscription } from 'rxjs';
import { GetTaskByIdQuery } from '../../../graphql/generated/graphql';
import { TaskService } from '../../services/task/task.service';

@Component({
  selector: 'task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit, OnDestroy {
  private taskLoading: boolean = false;
  // public task: ;
  private subscriptions: Array<Subscription> = [];
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}
  ngOnDestroy() {
    this.subscriptions.forEach((x) => x.unsubscribe);
  }

  ngOnInit() {
    // let id: any = this.route.snapshot.paramMap.get('id');
    // id = +id;
    // this.subscriptions.push(
    //   this.taskService.getOneById(id).subscribe((x) => {
    //     (this.taskLoading = true), (this.task = x?.data?.findOneTaskById);
    //   })
    // );
  }
}
