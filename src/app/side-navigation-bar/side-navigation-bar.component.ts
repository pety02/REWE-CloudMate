import { Component } from '@angular/core';
import {MatDrawer, MatDrawerContainer} from '@angular/material/sidenav';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {FileItem} from '../file-card/models/file-item.model';
import {CreateFileViewComponent} from '../create-file-view/create-file-view.component';

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
  constructor(private dialog: MatDialog) {
  }

  onUpload() {
    let newFile: FileItem = {
      name: '',
      extension: '',
      content: '',
      size: 0,
      url: '',
      createDate: '',
      updateDate: '',
      createUser: '',
      updateUser: ''
    };

    this.dialog.open(CreateFileViewComponent, {
      maxWidth: '37.5rem',
      maxHeight: '87vh',
      data: newFile,
      autoFocus: true,
      panelClass: 'file-preview-dialog'
    });
  }
}
