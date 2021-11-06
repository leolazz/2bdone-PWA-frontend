import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonSelect } from '@ionic/angular';
import { Subscription } from 'rxjs';
import {
  AllTasksProjectFormQuery,
  CreateProjectDto,
} from '../../../generated/graphql';
import { ProjectService } from '../../services/projects/project.service';
import { TaskService } from '../../services/task/task.service';

@Component({
  selector: 'project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit, OnDestroy {
  myForm: FormGroup;
  project: CreateProjectDto = {
    title: '',
    isCompleted: false,
    createdDate: this.todaysDate(),
    endDate: '',
  };
  private subscriptions: Array<Subscription> = [];
  public tasks: AllTasksProjectFormQuery['allOrphanTasks'];
  private tasksLoading: boolean = false;
  @ViewChild('tasksSelect', { static: false }) tasksSelect: IonSelect;
  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private taskService: TaskService
  ) {}

  resetTasks() {
    this.tasksSelect.value = '';
  }
  get projectTitle() {
    return this.myForm.get('title');
  }
  get projectEndDate() {
    return this.myForm.get('endDate');
  }
  get projectTasks() {
    return this.myForm.get('tasksId');
  }
  saveProject() {
    const project = { ...this.project, ...this.myForm.value };
    console.log(project);
    this.projectService.createProject(project);
  }
  todaysDate() {
    const today = new Date();
    return today.toISOString().substring(0, 10);
  }
  maxDate() {
    return new Date(new Date().setFullYear(new Date().getFullYear() + 5))
      .toISOString()
      .substring(0, 4);
  }
  ngOnInit() {
    this.subscriptions.push(
      this.taskService.getTasksProjectFormObservable().subscribe((x) => {
        this.tasksLoading = x.loading;
        this.tasks = x?.data?.allOrphanTasks;
      })
    );

    this.myForm = this.fb.group({
      title: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      details: [],
      tasksId: [],
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
}
