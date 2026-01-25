import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type SortKey = 'title' | 'size' | 'createdAt' | 'updatedAt';
export type SortDirection = 'asc' | 'desc';

@Injectable({
  providedIn: 'root'
})
export class FileSortService {
  private sortState$ = new BehaviorSubject<{
    key: SortKey;
    direction: SortDirection;
  }>({
    key: 'title',
    direction: 'asc'
  });

  sortChanged$ = this.sortState$.asObservable();

  setSort(key: SortKey, direction: SortDirection) {
    this.sortState$.next({ key, direction });
  }

  getSortState() {
    return this.sortState$.getValue();
  }
}
