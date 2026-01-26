import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileItem } from '../../models/file-item.model';
import {FileDialogData} from '../../models/file-dialog-data.model';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {NgIf} from '@angular/common';

/**
 * CreateOrUpdateFileViewComponent
 *
 * A dialog component used for creating or updating file metadata and content.
 * Supports selecting a file from the local filesystem, updating its properties,
 * and submitting the result back to the parent component.
 */
@Component({
  selector: 'app-create-or-update-file',
  standalone: true,
  templateUrl: './create-or-update-file-view.component.html',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatIconButton,
    MatIcon,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatCardActions,
    MatButton,
    NgIf
  ],
  styleUrl: './create-or-update-file-view.component.css'
})
export class CreateOrUpdateFileViewComponent implements OnInit {
  /** Reactive form for file data */
  fileForm!: FormGroup;

  /** Name of the file selected in the dialog */
  selectedFileName = '';

  /** Determines if the dialog is in edit mode */
  isEdit = false;

  /**
   * @param fb Angular FormBuilder for reactive forms
   * @param dialogRef Reference to the dialog instance
   * @param data Data passed to the dialog (file info and mode)
   */
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateOrUpdateFileViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FileDialogData
  ) {}

  /**
   * Lifecycle hook that initializes the form.
   * Sets default values and handles edit mode pre-filling.
   */
  ngOnInit(): void {
    this.isEdit = this.data.mode === 'edit';

    this.fileForm = this.fb.group({
      name: ['', Validators.required],
      extension: [''],
      content: [''],
      size: [0],
      url: [''],
      createDate: [''],
      updateDate: [''],
      createUser: [''],
      updateUser: ['']
    });

    if (this.isEdit) {
      this.fileForm.patchValue(this.data.file);
      this.selectedFileName =
        `${this.data.file.name}.${this.data.file.extension}`;
    } else {
      this.fileForm.patchValue(this.data.file);
    }
  }

  /**
   * Handles file selection from an <input type="file"> element.
   * Reads file content as Data URL and updates form fields.
   *
   * @param event File input change event
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const extension = file.name.split('.').pop() ?? '';
    this.selectedFileName = file.name;

    const reader = new FileReader();
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

  /**
   * Submits the form if valid.
   * Closes the dialog and returns the updated FileItem object.
   */
  onSubmit(): void {
    if (this.fileForm.invalid) return;

    const result: FileItem = {
      ...this.fileForm.value,
      updateDate: this.isEdit ? new Date().toISOString() : '',
    };

    this.dialogRef.close(result);
  }

  /**
   * Cancels the dialog without saving changes.
   */
  onCancel(): void {
    this.dialogRef.close();
  }
}
