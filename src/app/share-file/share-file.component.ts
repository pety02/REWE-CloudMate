import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FileItem } from '../../models/file-item.model';
import { User } from '../../models/user.model';
import { StoredData } from '../../models/stored-data.model';
import { NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

/**
 * ShareFileComponent
 *
 * Dialog component that allows sharing a file with another user.
 * Validates that the user exists in stored data before updating file access.
 */
@Component({
  selector: 'app-share-file',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardContent,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    MatError,
    NgIf,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './share-file.component.html',
  styleUrls: [
    './share-file.component.css',
    '../../styles/file/shared-styles.css'
  ]
})
export class ShareFileComponent {
  /** Form group for username input */
  shareForm: FormGroup;

  /**
   * @param fb Angular FormBuilder for reactive forms
   * @param dialogRef Reference to the dialog instance
   * @param item FileItem to share
   */
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ShareFileComponent>,
    @Inject(MAT_DIALOG_DATA) public item: FileItem
  ) {
    this.shareForm = this.fb.group({
      username: ['', Validators.required]
    });
  }

  /** Shortcut to access the username form control */
  get usernameCtrl() {
    return this.shareForm.get('username')!;
  }

  /**
   * Submits the share form.
   * Validates that the target user exists and updates stored data accordingly.
   */
  onSubmit(): void {
    if (this.shareForm.invalid) return;

    const username = this.usernameCtrl.value.trim();
    const stored = this.getStoredData();

    const userExists = stored.users.some(
      (u: User) => u.username === username
    );

    if (!userExists) {
      this.usernameCtrl.setErrors({ userNotFound: true });
      return;
    }

    this.shareFileWithUser(stored, username);

    alert(`File "${this.item.name}.${this.item.extension}" shared with ${username}`);
    this.dialogRef.close(true);
  }

  /**
   * Adds the file to the specified user's shared files in localStorage.
   *
   * @param data StoredData object
   * @param username Target username
   * @private
   */
  private shareFileWithUser(data: StoredData, username: string): void {
    const fileKey = `${this.item.name}.${this.item.extension}`;

    if (!data.userFiles[username]) {
      data.userFiles[username] = [];
    }

    if (!data.userFiles[username].includes(fileKey)) {
      data.userFiles[username].push(fileKey);
    }

    localStorage.setItem('storedData', JSON.stringify(data));
  }

  /**
   * Retrieves stored file and user data from localStorage.
   *
   * @returns StoredData object
   * @private
   */
  private getStoredData(): StoredData {
    const raw = localStorage.getItem('files');

    if (!raw) {
      throw new Error('No stored data found');
    }

    return JSON.parse(raw) as StoredData;
  }

  /**
   * Closes the share dialog without sharing.
   */
  closeFile(): void {
    this.dialogRef.close();
  }
}
