import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonSelect, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import {
  CreateTaskInput,
  AllProjectsTaskFormQuery,
} from '../../../graphql/generated/graphql';
import { ProjectService } from '../../services/projects/project.service';
import { TaskService } from '../../services/task/task.service';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit, OnDestroy {
  myForm: FormGroup;
  task: CreateTaskInput = {
    title: '',
    endDate: '',
    isCompleted: false,
    createdDate: this.todaysDate(),
  };

  private subscriptions: Array<Subscription> = [];
  public projects: AllProjectsTaskFormQuery['allProjects'];
  private projectsLoading: boolean = false;
  @ViewChild('projectSelect', { static: false }) projectSelect: IonSelect;
  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private taskService: TaskService,
    public toastController: ToastController
  ) {}

  async Toast(header: string, error: boolean) {
    let color;
    error ? (color = 'danger') : (color = 'secondary');
    const created = await this.toastController.create({
      header,
      position: 'top',
      animated: true,
      duration: 4000,

      color,
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
        },
      ],
    });
    await created.present();
  }

  resetProject() {
    this.projectSelect.value = '';
  }

  get taskTitle() {
    return this.myForm.get('title');
  }
  get taskEndDate() {
    return this.myForm.get('endDate');
  }
  async saveTask() {
    let newTask: CreateTaskInput = { ...this.task, ...this.myForm.value };
    newTask.endDate = newTask.endDate.substring(0, 10);
    const result = await this.taskService.createTask(newTask);
    if (result?.data?.createTask) this.Toast('Task Added!', false);
    else this.Toast('Something Went Wrong', true);
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
      this.projectService.getProjectsTaskFormObservable().subscribe((x) => {
        this.projectsLoading = x.loading;
        this.projects = x?.data?.allProjects;
      })
    );

    this.myForm = this.fb.group({
      title: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      details: [],
      outcomes: [],
      projectId: [],
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
}
