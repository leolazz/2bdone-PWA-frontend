import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonSelect, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import {
  CreateProjectDto,
  AllTasksProjectFormQuery,
  GetProjectByIdQuery,
  UpdateProjectDto,
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
  clearExistingProjects: boolean;
  @ViewChild('tasksSelect', { static: false }) tasksSelect: IonSelect;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private taskService: TaskService,
    public toastController: ToastController,
    public alertController: AlertController
  ) {
    this.myForm = this.fb.group({
      title: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      details: [''],
      tasksId: [],
      isCompleted: [false],
      removeExistingTasks: [false],
    });
  }
  async Toast(header: string, error: boolean) {
    let color;
    error ? (color = 'danger') : (color = 'secondary');
    const toast = await this.toastController.create({
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
    await toast.present();
  }
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
    return this.myForm.get('tasksId').value;
  }

  async deleteProjectAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete Options',
      message: 'Are you sure you want to delete this Project?',
      buttons: [
        { text: 'Cancel' },
        { text: 'Delete Project Only', handler: () => this.deleteProject() },
        {
          text: 'Delete All Tasks & Project',
          handler: () => this.deleteProject(true),
        },
      ],
    });

    await alert.present();
  }

  async deleteProject(deleteTasks: boolean = false) {
    const deletedProject = await this.projectService.deleteProject({
      id: +this.id,
      deleteTasks: deleteTasks,
    });
    deletedProject?.data?.deleteProject
      ? this.Toast(
          `'${deletedProject?.data?.deleteProject?.title}' Deleted`,
          false
        )
      : this.Toast('Something Went Wrong', true);
  }
  async updateProject() {
    let updatedProject: UpdateProjectDto;
    this.myForm.controls['removeExistingTasks'].disabled
      ? (updatedProject = {
          ...this.project,
          ...this.myForm.value,
          removeExistingTasks: false,
        })
      : (updatedProject = {
          ...this.project,
          tasksId: [],
          ...this.myForm.value,
        });
    updatedProject.endDate = updatedProject.endDate.substring(0, 10);
    if (updatedProject.tasksId === null) updatedProject.tasksId = [];
    const result = await this.projectService.updateProject(updatedProject);
    if (result?.data?.updateProject) this.Toast('Project Updated!', false);
    else this.Toast('Something Went Wrong.', true);
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
        this.myForm.patchValue({ endDate: this.project?.endDate });
        this.myForm.patchValue({ title: this.project?.title });
        this.myForm.patchValue({ details: this.project?.details });
        this.myForm.patchValue({ isCompleted: this.project?.isCompleted });
        x?.data?.findOneProjectById.tasks?.length <= 0
          ? this.myForm.controls['removeExistingTasks'].disable()
          : this.myForm.controls['removeExistingTasks'].enable();
      })
    );
    this.subscriptions.push(
      this.taskService.getTasksProjectFormObservable().subscribe((x) => {
        this.tasksLoading = x.loading;
        this.tasks = x?.data?.allOrphanTasks;
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
}
