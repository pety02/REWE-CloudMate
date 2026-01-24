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
    MatButton,
  ],
  providers: [DatePipe],
  templateUrl: './file-card.component.html',
  styleUrl: './file-card.component.css'
})
export class FileCardComponent implements OnInit {
  @Input() file!: FileItem;

  @Output() delete = new EventEmitter<FileItem>();

  constructor(private dialog: MatDialog, private router: Router, private datePipe: DatePipe) {}

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
    if (!stored) return;

    const data = JSON.parse(stored);

    const fileKey = `${file.name}.${file.extension}`;

    data.files = data.files.filter(
      (f: FileItem) =>
        !(f.name === file.name && f.extension === file.extension)
    );

    Object.keys(data.userFiles).forEach(username => {
      data.userFiles[username] =
        data.userFiles[username].filter((f: string) => f !== fileKey);
    });

    localStorage.setItem('files', JSON.stringify(data));

    console.log('Deleted file:', fileKey);

    this.delete.emit(file);
    this.router.navigate(['/home']);
  }

  onShare(file: FileItem): void {
    console.log('Share', file);
  }

  openFile(file: FileItem): void {
    localStorage.setItem('openedFile', JSON.stringify(file));

    this.dialog.open(OpenedFileFullPreviewComponent, {
      width: '37.5rem',
      height: '80vh',
      data: file,
      autoFocus: true
    });
  }

  get tooltipText(): string {
    const format = (d: any) => {
      if (!d) return 'N/A';

      try {
        const mediumDate = this.datePipe.transform(d, 'medium') || 'N/A';
        return mediumDate.replace(/\s([AP]M)$/, '\u00A0$1');
      } catch (e) {
        return 'Invalid Date';
      }
    };

    return `Created: ${format(this.file.createDate)}\nUpdated: ${format(this.file.updateDate)}`;
  }
}
