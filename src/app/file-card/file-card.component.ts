import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton, MatIconButton} from '@angular/material/button';
import {FileItem} from '../../models/file-item.model';
import {MatIcon} from '@angular/material/icon';
import {FileSizePipe} from './pipes/file-size.pipe';
import {MatTooltip} from '@angular/material/tooltip';
import {DatePipe} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {OpenedFileFullPreviewComponent} from '../opened-file-full-preview/opened-file-full-preview.component';
import {ShareFileComponent} from '../share-file/share-file.component';
import {CreateOrUpdateFileViewComponent} from '../create-or-update-file-view/create-or-update-file-view.component';
import {FileService} from '../../services/file.service';

/**
 * FileCardComponent
 *
 * Displays a single file with preview, update, delete, share, and open functionality.
 * Handles emitting events and dialog interactions for file management.
 */
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
export class FileCardComponent {

  /** File data to display */
  @Input() file!: FileItem;

  /** Event emitted when the file is deleted */
  @Output() delete = new EventEmitter<FileItem>();

  /**
   * @param dialog Angular Material dialog service
   * @param datePipe Angular DatePipe for formatting dates
   * @param fileService Service for CRUD operations on files
   */
  constructor(private dialog: MatDialog, private datePipe: DatePipe, private fileService: FileService) {}

  /**
   * Determines if a file extension corresponds to an image.
   *
   * @param ext File extension
   * @returns true if the file is an image
   */
  isImage(ext: string): boolean {
    return ['png', 'jpg', 'jpeg', 'svg', 'ico'].includes(ext.toLowerCase());
  }

  /**
   * Previews the file by storing its content in localStorage.
   *
   * @param file FileItem to preview
   */
  onPreview(file: FileItem): void {
    localStorage.setItem('currentFileContent', file.content || '');
    console.log('Preview', file.content);
  }

  /**
   * Opens a dialog to update the file metadata or content.
   *
   * @param file FileItem to edit
   */
  onUpdate(file: FileItem): void {
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const dialogRef = this.dialog.open(CreateOrUpdateFileViewComponent, {
      data: { file, mode: 'edit' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.updateUser = user.username;
        result.updateDate = new Date().toISOString();
        this.fileService.updateFile(result);
        this.fileService.notifyFileChanged();
      }
    });
  }

  /**
   * Deletes a file and emits a delete event.
   *
   * @param file FileItem to delete
   */
  onDelete(file: FileItem): void {
    this.fileService.deleteFile(file);
    this.fileService.notifyFileChanged();
    this.delete.emit(file);
  }

  /**
   * Opens a dialog to share the file.
   *
   * @param file FileItem to share
   */
  onShare(file: FileItem): void {
    localStorage.setItem('sharedFile', JSON.stringify(file));

    this.dialog.open(ShareFileComponent, {
      width: '37.5rem',
      maxHeight: '30vh',
      data: file,
      autoFocus: true,
      panelClass: 'file-preview-dialog'
    });
  }

  /**
   * Opens a full preview dialog for the file.
   *
   * @param file FileItem to open
   */
  openFile(file: FileItem): void {
    localStorage.setItem('openedFile', JSON.stringify(file));

    this.dialog.open(OpenedFileFullPreviewComponent, {
      maxWidth: '37.5rem',
      maxHeight: '87vh',
      data: file,
      autoFocus: true,
      panelClass: 'file-preview-dialog'
    });
  }

  /**
   * Tooltip text for file card showing formatted creation and update dates.
   */
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
