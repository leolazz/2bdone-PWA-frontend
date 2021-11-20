import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonSelect, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import {
  CreateProjectDto,
  AllTasksProjectFormQuery,
  GetProjectByIdQuery,
} from '../../../graphql/generated/graphql';
import { ProjectService } from '../../services/projects/project.service';
import { TaskService } from '../../services/task/task.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  id: string;
  myForm: FormGroup;
  project: GetProjectByIdQuery['findOneProjectById'];
  private subscriptions: Array<Subscription> = [];
  public tasks: AllTasksProjectFormQuery['allOrphanTasks'];
  private projectLoading: boolean = false;
  private tasksLoading: boolean = false;
  @ViewChild('tasksSelect', { static: false }) tasksSelect: IonSelect;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private taskService: TaskService,
    public toastController: ToastController
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
    const newProject: CreateProjectDto = {
      ...this.project,
      ...this.myForm.value,
    };
    newProject.endDate = newProject.endDate.substring(0, 10);
    newProject.tasksId === null
      ? (newProject.tasksId = [])
      : (newProject.tasksId = newProject.tasksId);
    console.log(newProject);
    this.projectService.createProject(newProject);
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
    this.id = this.route.snapshot.paramMap.get('id');
    this.subscriptions.push(
      this.projectService.getOneById(+this.id).subscribe((x) => {
        this.projectLoading = true;
        this.project = x?.data?.findOneProjectById;
        this.myForm.patchValue({ endDate: this.project.endDate });
        this.myForm.patchValue({ title: this.project.title });
      })
    );
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
