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

    this.fileService.getSearchQuery().subscribe(() => {
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
    const query = this.fileService.getCurrentSearchQuery(); // clean access

    let files: FileItem[] = [];

    const sortedRaw = localStorage.getItem('sortedFiles');
    if (sortedRaw) {
      files = JSON.parse(sortedRaw) as FileItem[];
    } else {
      files = this.fileService.getFiles(username);
    }

    files = files.filter(file => file.createUser === username);

    if (query) {
      const q = query.toLowerCase();
      files = files.filter(file =>
        file.name.toLowerCase().includes(q) ||
        file.extension.toLowerCase().includes(q)
      );
    }

    this.files = files;
  }

  onFileDeleted(file: FileItem): void {
    this.loadFiles();
  }
}
