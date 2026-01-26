import { Component } from '@angular/core';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FileSortService } from '../../../../services/file-sort.service';

/**
 * SortingNavBarComponent
 *
 * Displays a set of sort buttons for file listings (title, size, createdAt, updatedAt)
 * and allows toggling ascending/descending order. Updates the FileSortService with
 * the selected sort key and direction.
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
  /** Current sort direction ('asc' or 'desc') */
  sortDirection: 'asc' | 'desc' = 'asc';

  /** Current active sort key */
  activeSort: 'title' | 'size' | 'createdAt' | 'updatedAt' = 'title';

  /**
   * @param fileSortService Service to apply sort settings
   */
  constructor(private fileSortService: FileSortService) {}

  /**
   * Handles click on a sort button.
   * Toggles direction if the same key is clicked, or switches key and resets direction.
   *
   * @param sortKey Sort key that was clicked
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
   * Applies the current sort settings to the FileSortService.
   */
  applySort() {
    this.fileSortService.setSort(this.activeSort, this.sortDirection);
  }
}
