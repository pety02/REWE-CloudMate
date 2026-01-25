import { Component, OnInit } from '@angular/core';
import { FileCardComponent } from '../../../file-card/file-card.component';
import { FileItem } from '../../../file-card/models/file-item.model';
import { FileService } from '../../../file-card/file.service';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import {FileSortService} from '../../file-sort.service';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    FileCardComponent,
    MatGridList,
    MatGridTile
  ],
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  files: FileItem[] = [];

  constructor(
    private fileService: FileService,
    private fileSortService: FileSortService
  ) {}

  ngOnInit(): void {
    this.loadFiles();

    this.fileService.viewModeObservable$.subscribe(() => this.loadFiles());
    this.fileService.fileChanged$.subscribe(() => this.loadFiles());
    this.fileSortService.sortChanged$.subscribe(() => this.loadFiles());
    this.fileService.getSearchQuery().subscribe(() => this.loadFiles());
  }

  loadFiles(): void {
    const storedUser = localStorage.getItem('loggedInUser');
    if (!storedUser) {
      this.files = [];
      return;
    }

    const { username } = JSON.parse(storedUser);
    const mode = this.fileService.getCurrentViewMode();
    const query = this.fileService.getCurrentSearchQuery();

    let files =
      mode === 'home'
        ? this.fileService.getFiles(username)
        : this.fileService.getSharedFiles(username);

    if (query) {
      const q = query.toLowerCase();
      files = files.filter(file =>
        file.name.toLowerCase().includes(q) ||
        file.extension.toLowerCase().includes(q)
      );
    }

    const { key, direction } = this.fileSortService.getSortState();

    this.files = [...files].sort((a, b) => {
      let result = 0;

      switch (key) {
        case 'title':
          result = a.name.localeCompare(b.name);
          break;

        case 'size':
          result = (a.size ?? 0) - (b.size ?? 0);
          break;

        case 'createdAt':
          result =
            new Date(a.createDate).getTime() -
            new Date(b.createDate).getTime();
          break;

        case 'updatedAt':
          result =
            new Date(a.updateDate ?? 0).getTime() -
            new Date(b.updateDate ?? 0).getTime();
          break;
      }

      return direction === 'asc' ? result : -result;
    });
  }

  onFileDeleted(): void {
    this.loadFiles();
  }
}
