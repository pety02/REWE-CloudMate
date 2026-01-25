import { Component } from '@angular/core';
import {MatDrawer, MatDrawerContainer} from '@angular/material/sidenav';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {CreateOrUpdateFileViewComponent} from '../create-or-update-file-view/create-or-update-file-view.component';
import {FileItem} from '../../models/file-item.model';
import {FileService} from '../../services/file.service';

/**
 *
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
   *
   * @param dialog
   * @param fileService
   */
  constructor(private dialog: MatDialog, private fileService: FileService) {
  }

  /**
   *
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

  /**
   *
   */
  onHome(): void {
    this.fileService.setViewMode('home');
  }

  /**
   *
   */
  onShared(): void {
    this.fileService.setViewMode('shared');
  }
}
