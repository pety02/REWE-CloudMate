import { Component } from '@angular/core';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {FileItem} from '../file-card/models/file-item.model';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
    MatButtonToggleGroup,
    MatButtonToggle,
    MatIcon,
    MatButton,
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {
  sortDirection: 'asc' | 'desc' = 'asc';
  activeSort: 'title' | 'size' | 'createdAt' | 'updatedAt' = 'title';

  onSortClick(sortKey: typeof this.activeSort) {
    if (this.activeSort === sortKey) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.activeSort = sortKey;
      this.sortDirection = 'asc';
    }
  }

  private applyTitleSort (): void {
    const filesRaw = localStorage.getItem('files');
    const userRaw = localStorage.getItem('loggedInUser');

    if (!filesRaw || !userRaw) {
      console.warn('Files or logged-in user not found');
      return;
    }

    const files: FileItem[] = JSON.parse(filesRaw);
    const { username } = JSON.parse(userRaw);

    const userFiles = files.filter(
      file => file.createUser === username
    );

    userFiles.sort((a, b) => {
      const result = a.name.localeCompare(b.name, undefined, {
        sensitivity: 'base'
      });

      return this.sortDirection === 'asc' ? result : -result;
    });

    localStorage.setItem('sortedFiles', JSON.stringify(userFiles));

    console.log(
      `Sorted ${userFiles.length} files by title (${this.sortDirection})`
    );
  }

  private applySizeSort (): void{
    const filesRaw = localStorage.getItem('files');
    const userRaw = localStorage.getItem('loggedInUser');

    if (!filesRaw || !userRaw) {
      console.warn('Files or logged-in user not found');
      return;
    }

    const files: FileItem[] = JSON.parse(filesRaw);
    const { username } = JSON.parse(userRaw);

    const userFiles = files.filter(
      file => file.createUser === username
    );

    userFiles.sort((a, b) => {
      return this.sortDirection === 'asc'
        ? a.size - b.size
        : b.size - a.size;
    });

    localStorage.setItem('sortedFiles', JSON.stringify(userFiles));

    console.log(
      `Sorted ${userFiles.length} files by title (${this.sortDirection})`
    );
  }

  private applyCreatedAtSort(): void {
    const filesRaw = localStorage.getItem('files');
    const userRaw = localStorage.getItem('loggedInUser');

    if (!filesRaw || !userRaw) {
      console.warn('Files or logged-in user not found');
      return;
    }

    const files = JSON.parse(filesRaw);
    const { username } = JSON.parse(userRaw);

    const userFiles = files.filter(
      (file: any) => file.createUser === username && file.createDate
    );

    userFiles.sort((a: any, b: any) => {
      const timeA = new Date(a.createDate).getTime();
      const timeB = new Date(b.createDate).getTime();

      return this.sortDirection === 'asc'
        ? timeA - timeB
        : timeB - timeA;
    });

    localStorage.setItem('sortedFiles', JSON.stringify(userFiles));

    console.log(
      `Sorted by createDate (${this.sortDirection})`,
      userFiles
    );
  }

  private applyUpdatedAtSort(): void {
    const filesRaw = localStorage.getItem('files');
    const userRaw = localStorage.getItem('loggedInUser');

    if (!filesRaw || !userRaw) {
      console.warn('Files or logged-in user not found');
      return;
    }

    const files = JSON.parse(filesRaw);
    const { username } = JSON.parse(userRaw);

    const userFiles = files.filter(
      (file: any) => file.createUser === username && file.updateDate
    );

    userFiles.sort((a: any, b: any) => {
      const timeA = new Date(a.updateDate).getTime();
      const timeB = new Date(b.updateDate).getTime();

      return this.sortDirection === 'asc'
        ? timeA - timeB
        : timeB - timeA;
    });

    localStorage.setItem('sortedFiles', JSON.stringify(userFiles));

    console.log(
      `Sorted by updateDate (${this.sortDirection})`,
      userFiles
    );
  }

  applySort() {
    console.log('Sorting by:', this.activeSort, this.sortDirection);
    if(this.activeSort === 'title') {
      this.applyTitleSort();
    } else if (this.activeSort === 'size') {
      this.applySizeSort();
    } else if (this.activeSort === 'createdAt') {
      this.applyCreatedAtSort();
    } else {
      this.applyUpdatedAtSort();
    }
  }
}
