import { Component } from '@angular/core';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateOrUpdateFileViewComponent } from '../create-or-update-file-view/create-or-update-file-view.component';
import { FileItem } from '../../models/file-item.model';
import { FileService } from '../../services/file.service';

/**
 * SideNavigationBarComponent
 *
 * Displays a side navigation menu with buttons for:
 * - Uploading a new file
 * - Switching between Home view and Shared files view
 *
 * Uses MatDialog to open the file creation dialog and FileService to update the file data.
 */
@Component({
  selector: 'app-side-navigation-bar',
  standalone: true,
  imports: [
    MatDrawerContainer,
    MatDrawer,
    MatButton,
    MatIcon,
    MatDialogModule,
  ],
  templateUrl: './side-navigation-bar.component.html',
  styleUrl: './side-navigation-bar.component.css'
})
export class SideNavigationBarComponent {

  /**
   * @param dialog Angular Material Dialog service
   * @param fileService Service for managing file operations
   */
  constructor(private dialog: MatDialog, private fileService: FileService) {}

  /**
   * Opens a dialog to create a new file.
   * Adds the file to storage after the dialog is closed.
   */
  onUpload(): void {
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const newFile: FileItem = {
      name: '',
      extension: '',
      content: '',
      size: 0,
      url: '',
      createDate: new Date().toISOString(),
      updateDate: '',
      createUser: user.username,
      updateUser: ''
    };

    const dialogRef = this.dialog.open(CreateOrUpdateFileViewComponent, {
      data: { file: newFile, mode: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fileService.addFile(result);
        this.fileService.notifyFileChanged();
      }
    });
  }

  /** Switches the main content view to the user's own files. */
  onHome(): void {
    this.fileService.setViewMode('home');
  }

  /** Switches the main content view to the shared files view. */
  onShared(): void {
    this.fileService.setViewMode('shared');
  }
}
