import { Component, OnInit } from '@angular/core';
import { FileCardComponent } from '../../../file-card/file-card.component';
import { FileItem } from '../../../../models/file-item.model';
import { FileService } from '../../../../services/file.service';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { FileSortService } from '../../../../services/file-sort.service';

/**
 * MainContentComponent
 *
 * Displays the main file listing in a grid layout. Handles:
 * - Loading files for the logged-in user (own or shared)
 * - Filtering files based on search queries
 * - Sorting files according to user-selected criteria
 * - Reacting to changes in view mode, file updates, sorting, and search
 *
 * Subscribes to observables from FileService and FileSortService to keep the
 * displayed files up-to-date.
 */
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
  /** Array of files currently displayed in the grid */
  files: FileItem[] = [];

  /**
   * @param fileService Service for managing files and view state
   * @param fileSortService Service for managing file sorting state
   */
  constructor(
    private fileService: FileService,
    private fileSortService: FileSortService
  ) {}

  /**
   * Lifecycle hook: Called on component initialization.
   * - Loads files initially
   * - Subscribes to observables for:
   *   - View mode changes
   *   - File updates/deletions
   *   - Sort state changes
   *   - Search query changes
   */
  ngOnInit(): void {
    this.loadFiles();

    this.fileService.viewModeObservable$.subscribe(() => this.loadFiles());
    this.fileService.fileChanged$.subscribe(() => this.loadFiles());
    this.fileSortService.sortChanged$.subscribe(() => this.loadFiles());
    this.fileService.getSearchQuery().subscribe(() => this.loadFiles());
  }

  /**
   * Loads and filters files based on:
   * - Current logged-in user
   * - View mode (own files or shared files)
   * - Active search query
   * - Active sort key and direction
   *
   * Applies filtering and sorting to update the `files` array for display.
   */
  loadFiles(): void {
    const storedUser = localStorage.getItem('loggedInUser');
    if (!storedUser) {
      this.files = [];
      return;
    }

    const { username } = JSON.parse(storedUser);
    const mode = this.fileService.getCurrentViewMode();
    const query = this.fileService.getCurrentSearchQuery();

    // Select files based on mode: own files vs shared files
    let files =
      mode === 'home'
        ? this.fileService.getFiles(username)
        : this.fileService.getSharedFiles(username);

    // Apply search query filtering if present
    if (query) {
      const q = query.toLowerCase();
      files = files.filter(file =>
        file.name.toLowerCase().includes(q) ||
        file.extension.toLowerCase().includes(q)
      );
    }

    // Apply sorting based on key and direction
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

  /**
   * Callback triggered when a file is deleted.
   * Reloads the current file list to reflect the deletion.
   */
  onFileDeleted(): void {
    this.loadFiles();
  }
}
