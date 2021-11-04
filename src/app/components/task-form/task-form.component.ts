import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateTaskDto } from '../../../generated/graphql';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  myForm: FormGroup;
  task: CreateTaskDto = {
    title: '',
    endDate: '',
    isCompleted: false,
    createdDate: this.todaysDate(),
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      taskTitle: ['', [Validators.required]],
      taskEndDate: ['', [Validators.required]],
      taskDetails: [],
      taskOutcomes: [],
    });
  }
  taskEndDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.myForm.get('dob').setValue(date, {
      onlyself: true,
    });
  }
  get taskTitle() {
    return this.myForm.get('taskTitle');
  }
  saveTask() {
    console.log(this.myForm.value);
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
