import { Component } from '@angular/core';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-navigation-bar',
  imports: [
    MatButtonToggleGroup,
    MatButtonToggle,
    MatIconButton,
    MatIcon,
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {
  sortDirection: 'asc' | 'desc' = 'asc';
  activeSort = 'title';

  onSortChange(event: any) {
    if (this.activeSort === event.value) {
      this.toggleDirection();
    } else {
      this.activeSort = event.value;
      this.sortDirection = 'asc';
    }

    this.applySort();
  }

  toggleDirection() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.applySort();
  }

  applySort() {
    console.log('Sorting by:', this.activeSort, this.sortDirection);
    // Apply your sorting logic here
  }
}
