import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton, MatIconButton} from '@angular/material/button';
import {FileItem} from './models/file-item.model';
import {MatIcon} from '@angular/material/icon';
import {FileSizePipe} from './pipes/file-size.pipe';
import {MatTooltip} from '@angular/material/tooltip';
import {DatePipe} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {OpenedFileFullPreviewComponent} from '../opened-file-full-preview/opened-file-full-preview.component';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

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
export class FileCardComponent implements OnInit {
  @Input() file!: FileItem;

  @Output() delete = new EventEmitter<FileItem>();

  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {}

  isImage(ext: string): boolean {
    return ['png', 'jpg', 'jpeg', 'svg', 'ico'].includes(ext.toLowerCase());
  }

  onPreview(file: FileItem): void {
    localStorage.setItem('currentFileContent', file.content || '');
    console.log('Preview', file.content);
  }

  onUpdate(file: FileItem): void {
    console.log('Update', file);
  }

  onDelete(file: FileItem): void {
    const stored = localStorage.getItem('files');
    let files: FileItem[] = stored ? JSON.parse(stored) : [];

    console.log("ALL FILES: ", files);
    files = files.filter(f => f.name !== file.name || f.extension !== file.extension);
    console.log("WITHOUT CURR FILE: ", files);

    localStorage.setItem('files', JSON.stringify(files));

    console.log('Deleted', file);

    this.delete.emit(file);
    this.router.navigate(['/home']);
  }

  onShare(file: FileItem): void {
    console.log('Share', file);
  }

  openFile(file: FileItem): void {
    localStorage.setItem('openedFile', JSON.stringify(file));

    this.dialog.open(OpenedFileFullPreviewComponent, {
      width: '600px',
      height: '80vh',
      data: file,
      autoFocus: true
    });
  }
}
