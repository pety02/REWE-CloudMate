import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton, MatIconButton} from '@angular/material/button';
import {FileItem} from './models/file-item.model';
import {MatIcon} from '@angular/material/icon';
import {FileSizePipe} from './pipes/file-size.pipe';
import {MatTooltip} from '@angular/material/tooltip';
import {DatePipe} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {OpenedFileFullPreviewComponent} from '../opened-file-full-preview/opened-file-full-preview.component';

@Component({
  selector: 'app-file-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardFooter,
    MatCardTitle,
    MatIcon,
    MatIconButton,
    FileSizePipe,
    MatTooltip,
    DatePipe,
    MatButton,
  ],
  templateUrl: './file-card.component.html',
  styleUrl: './file-card.component.css'
})
export class FileCardComponent {
  @Input() file!: FileItem;

  constructor(private dialog: MatDialog) {}

  isImage(ext: string): boolean {
    return ['png', 'jpg', 'jpeg', 'svg', 'ico'].includes(ext.toLowerCase());
  }

  onPreview(file: FileItem): void {
    console.log('Preview', file);
  }

  onUpdate(file: FileItem): void {
    console.log('Update', file);
  }

  onDelete(file: FileItem): void {
    console.log('Delete', file);
  }

  onShare(file: FileItem): void {
    console.log('Share', file);
  }

  openFile(file: FileItem): void {
    localStorage.setItem("openedFile", JSON.stringify(file));

    this.dialog.open(OpenedFileFullPreviewComponent, {
      width: '600px',
      height: '80vh',
      data: file,
      autoFocus: true,
    });
  }
}
