import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type SortKey = 'title' | 'size' | 'createdAt' | 'updatedAt';
export type SortDirection = 'asc' | 'desc';

/**
 * FileSortService
 *
 * Manages the current sorting state of files.
 * Provides an observable to notify subscribers of sort changes.
 */
@Injectable({
  providedIn: 'root'
})
export class FileSortService {

  /** Internal BehaviorSubject holding the current sort state */
  private sortState$ = new BehaviorSubject<{
    key: SortKey;
    direction: SortDirection;
  }>({
    key: 'title',
    direction: 'asc'
  });

  /** Observable emitting whenever the sort state changes */
  sortChanged$ = this.sortState$.asObservable();

  /** Updates the sort state */
  setSort(key: SortKey, direction: SortDirection) {
    this.sortState$.next({ key, direction });
  }

  /** Returns the current sort state */
  getSortState() {
    return this.sortState$.getValue();
  }
}
