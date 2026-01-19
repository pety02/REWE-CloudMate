import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileItem } from '../file-card/models/file-item.model';
import {DatePipe, DecimalPipe} from '@angular/common';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatIconButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-opened-file-full-preview',
  templateUrl: './opened-file-full-preview.component.html',
  imports: [
    DecimalPipe,
    DatePipe,
    MatCardContent,
    MatCardHeader,
    MatCard,
    MatCardTitle,
    MatIconButton,
    MatIcon,
    MatLabel,
    MatInput,
    MatFormField
  ],
  styleUrls: ['./opened-file-full-preview.component.css']
})
export class OpenedFileFullPreviewComponent {

  constructor(
    public dialogRef: MatDialogRef<OpenedFileFullPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public item: FileItem
  ) {}

  closeFile(): void {
    this.dialogRef.close();
  }
}
