import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileSortService {
  // Observable stream for sort changes
  private sortChanged = new Subject<void>();
  sortChanged$ = this.sortChanged.asObservable();

  // Call this method whenever the sort changes
  notifySortChanged() {
    this.sortChanged.next();
  }
}
