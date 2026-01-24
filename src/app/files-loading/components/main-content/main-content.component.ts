import { Component, OnInit } from '@angular/core';
import { FileCardComponent } from '../../../file-card/file-card.component';
import { FileItem } from '../../../file-card/models/file-item.model';
import { FileService } from '../../../file-card/file.service';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import {FileSortService} from '../../services/file-sort.service';

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

    this.fileSortService.sortChanged$.subscribe(() => {
      this.loadFiles();
    });
  }

  loadFiles(): void {
    const storedUser = localStorage.getItem('loggedInUser');
    if (!storedUser) {
      this.files = [];
      return;
    }

    const { username } = JSON.parse(storedUser);

    // Get sorted files from localStorage if they exist
    const sortedRaw = localStorage.getItem('sortedFiles');
    if (sortedRaw) {
      const sortedFiles: FileItem[] = JSON.parse(sortedRaw);
      // Filter only files belonging to this user
      this.files = sortedFiles.filter(file => file.createUser === username);
      return;
    }

    // Fallback: get unsorted files from service
    this.files = this.fileService.getFiles(username);
  }

  onFileDeleted(file: FileItem): void {
    // Refresh the list when a file is deleted
    this.loadFiles();
  }

  trackByName(index: number, file: FileItem) {
    return file.name;
  }
}
