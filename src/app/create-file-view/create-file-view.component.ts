import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FileItem} from '../file-card/models/file-item.model';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-create-file',
  standalone: true,
  templateUrl: './create-file-view.component.html',
  imports: [
    MatIcon,
    MatIconButton,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatLabel,
    MatCardActions,
    MatButton,
    MatCardContent
  ],
  styleUrls: ['./create-file-view.component.css']
})
export class CreateFileViewComponent implements OnInit {
  fileForm!: FormGroup;
  selectedFileName = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.fileForm = this.fb.group({
      name: ['', Validators.required],
      extension: [''],
      content: [''],
      size: [0],
      url: [''],
      createDate: [new Date().toISOString()],
      updateDate: [''],
      createUser: [localStorage.getItem('loggedInUser')],
      updateUser: ['']
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    this.selectedFileName = input.files[0].name;

    const file = input.files[0];
    const reader = new FileReader();

    const extension = file.name.split('.').pop() ?? '';

    reader.onload = () => {
      this.fileForm.patchValue({
        name: file.name.replace(`.${extension}`, ''),
        extension,
        size: file.size,
        content: reader.result,
        url: URL.createObjectURL(file)
      });
    };

    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.fileForm.valid) {
      const fileItem: FileItem = this.fileForm.value;
      console.log('Saved FileItem:', fileItem);
    }
  }
}
