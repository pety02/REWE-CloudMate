import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatIconButton} from '@angular/material/button';
import {FileItem} from './models/file-item.model';
import {MatIcon} from '@angular/material/icon';
import {FileSizePipe} from './pipes/file-size.pipe';
import {MatTooltip} from '@angular/material/tooltip';
import {DatePipe} from '@angular/common';

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
  ],
  templateUrl: './file-card.component.html',
  styleUrl: './file-card.component.css'
})
export class FileCardComponent {
  @Input() file!: FileItem;

  isImage(ext: string): boolean {
    return ['png', 'jpg', 'jpeg', 'svg', 'ico'].includes(ext.toLowerCase());
  }

  getFileIcon(ext: string): string {
    switch (ext.toLowerCase()) {
      case 'pdf':
        return 'picture_as_pdf';
      case 'docx':
        return 'description';
      default:
        return 'insert_drive_file';
    }
  }

  onPreview(file: FileItem): void {
    console.log(file.content);
    localStorage.setItem("currentFileContent", file.content || '');
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
}
