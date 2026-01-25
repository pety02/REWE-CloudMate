import { Component } from '@angular/core';
import {MatDrawer, MatDrawerContainer} from '@angular/material/sidenav';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {CreateOrUpdateFileViewComponent} from '../create-or-update-file-view/create-or-update-file-view.component';

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

  onUpload(): void {
    const storedUser = localStorage.getItem('loggedInUser');
    const user = storedUser ? JSON.parse(storedUser) : null;

    this.dialog.open(CreateOrUpdateFileViewComponent, {
      data: {
        mode: 'create',
        file: {
          name: '',
          extension: '',
          content: '',
          size: 0,
          url: '',
          createDate: new Date().toISOString(),
          updateDate: '',
          createUser: user?.username ?? '',
          updateUser: ''
        }
      }
    }).afterClosed().subscribe(newFile => {
      if (!newFile) return;

      console.log('Created file:', newFile);
      // persist new file here
    });
  }
}
