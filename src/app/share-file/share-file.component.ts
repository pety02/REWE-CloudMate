import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {
  MatCard,
  MatCardContent, MatCardHeader, MatCardTitle,
} from '@angular/material/card';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FileItem} from '../../models/file-item.model';
import {User} from '../../models/user.model';
import {StoredData} from '../../models/stored-data.model';
import {NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';

/**
 *
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
  shareForm: FormGroup;

  /**
   *
   * @param fb
   * @param dialogRef
   * @param item
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

  /**
   *
   */
  get usernameCtrl() {
    return this.shareForm.get('username')!;
  }

  /**
   *
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
   *
   * @param data
   * @param username
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
   *
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
   *
   */
  closeFile(): void {
    this.dialogRef.close();
  }
}
