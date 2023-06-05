import { Component } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder } from "@angular/forms";
import { LocalStorageService } from "../localstorage.service";

interface ITask {
  id: string;
  description: string;
  date: string;
}

@Component({
  selector: 'task-main',
  templateUrl: './task-main.component.html',
  styleUrls: ['./task-main.component.css']
})
export class TaskMainComponent {

  todos: ITask[] = [];

  form = this.fb.group({
    description: [],
    date: []
  });

  constructor(
    private modalService: NgbModal,
    private lsService: LocalStorageService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.todos = JSON.parse(this.lsService.get('todos') || '')
  }

  openModal(instance: any) {
    this.modalService.open(instance);
  }

  closeModal() {
    this.modalService.dismissAll()
  }

  onRemoveTask(id: string) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.lsService.set('todos', JSON.stringify(this.todos));
  }

  onAddNewTask() {
    this.todos.push({ ...this.form.getRawValue(), id: (Math.floor(Math.random() * 100000)).toString() });
    this.lsService.set('todos', JSON.stringify(this.todos));
    this.form.patchValue({
      description: '',
      date: ''
    });
    this.closeModal();
  }
}
