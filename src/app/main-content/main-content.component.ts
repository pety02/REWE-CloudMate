import {Component, OnInit} from '@angular/core';
import {FileCardComponent} from '../file-card/file-card.component';
import {FileItem} from '../file-card/models/file-item.model';
import {FileService} from '../file-card/file.service';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';

@Component({
  selector: 'app-main-content',
  imports: [
    FileCardComponent,
    MatGridList,
    MatGridTile
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent implements OnInit {
  files!: FileItem[];

  constructor(private fileService: FileService) {
  }

  ngOnInit(): void {
    this.loadFiles();
  }

  loadFiles(): void {
    const storedUser = localStorage.getItem('loggedInUser');

    if (!storedUser) {
      this.files = [];
      return;
    }
    const { username } = JSON.parse(storedUser);
    this.files = this.fileService.getFiles(username);
  }

  onFileDeleted(file: FileItem): void {
    // Refresh the files array
    this.loadFiles();
  }
}
