import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonInput, IonSelect } from '@ionic/angular';
import { Subscription } from 'rxjs';
import {
  AllProjectsTaskFormQuery,
  CreateTaskDto,
  GetTaskByIdQuery,
} from '../../../graphql/generated/graphql';
import { ProjectService } from '../../services/projects/project.service';
import { TaskService } from '../../services/task/task.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit, OnDestroy {
  private id: string;
  private taskLoading: boolean = false;
  public task: GetTaskByIdQuery['findOneTaskById'];
  private subscriptions: Array<Subscription> = [];
  public myForm: FormGroup;
  public projects: AllProjectsTaskFormQuery['allProjects'];
  private projectsLoading: boolean = false;
  public updateSucessful: boolean = false;
  @ViewChild('projectSelect', { static: false }) projectSelect: IonSelect;
  @ViewChild('titleInput', { static: false }) titleInput: IonInput;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private fb: FormBuilder,
    private projectService: ProjectService,
    public toastController: ToastController
  ) {
    this.myForm = this.fb.group({
      title: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      details: [''],
      outcomes: [''],
      projectId: [],
    });
  }
  ngOnDestroy() {
    this.subscriptions.forEach((x) => x.unsubscribe);
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.subscriptions.push(
      this.taskService.getOneById(+this.id).subscribe((x) => {
        this.taskLoading = true;
        this.task = x?.data?.findOneTaskById;
        this.myForm.patchValue({ endDate: this.task.endDate });
        this.myForm.patchValue({ title: this.task.title });
      })
    );
    this.subscriptions.push(
      this.projectService.getProjectsTaskFormObservable().subscribe((x) => {
        this.projectsLoading = x.loading;
        this.projects = x?.data?.allProjects;
      })
    );
  }
  async taskUpdatedToast() {
    const updateSucessful = await this.toastController.create({
      header: 'Task Updated!',
      position: 'top',
      animated: true,
      duration: 4000,

      color: 'secondary',
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
        },
      ],
    });
    await updateSucessful.present();
  }

  resetProject() {
    this.projectSelect.value = '';
  }

  get taskTitle() {
    return this.myForm.get('title');
  }
  taskProject() {
    return this.myForm.get('projectId').value;
  }
  get taskEndDate() {
    return this.myForm.get('endDate');
  }
  compareWithFn(project1, project2) {
    return project1 === project2;
  }

  async updateTask() {
    let updatedTask: CreateTaskDto;
    if (this.taskProject() === null) {
      updatedTask = { ...this.myForm.value, ...this.task };
    } else {
      updatedTask = { ...this.task, ...this.myForm.value };
    }
    updatedTask.endDate = updatedTask.endDate.substring(0, 10);
    const returnedTask = await this.taskService.updateTask({ ...updatedTask });
    if (returnedTask) this.taskUpdatedToast();
  }
  formatDate(date: string) {
    const today = new Date(date);
    return today.toISOString().substring(0, 10);
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
}
