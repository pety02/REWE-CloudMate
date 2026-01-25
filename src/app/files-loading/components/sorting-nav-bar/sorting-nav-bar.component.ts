import { Component } from '@angular/core';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {FileSortService} from '../../../../services/file-sort.service';

/**
 *
 */
@Component({
  selector: 'app-sorting-nav-bar',
  standalone: true,
  imports: [
    MatButtonToggleGroup,
    MatButtonToggle,
    MatIcon,
    MatButton,
  ],
  templateUrl: './sorting-nav-bar.component.html',
  styleUrl: './sorting-nav-bar.component.css'
})
export class SortingNavBarComponent {
  sortDirection: 'asc' | 'desc' = 'asc';
  activeSort: 'title' | 'size' | 'createdAt' | 'updatedAt' = 'title';

  /**
   *
   * @param fileSortService
   */
  constructor(private fileSortService: FileSortService) {
  }

  /**
   *
   * @param sortKey
   */
  onSortClick(sortKey: typeof this.activeSort) {
    if (this.activeSort === sortKey) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.activeSort = sortKey;
      this.sortDirection = 'asc';
    }
  }

  /**
   *
   */
  applySort() {
    this.fileSortService.setSort(this.activeSort, this.sortDirection);
  }
}
