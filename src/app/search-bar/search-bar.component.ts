import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatFormField, MatInput, MatLabel, MatPrefix } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';

/**
 * SearchBarComponent
 *
 * Provides a reactive search input that emits a debounced search term.
 * Emits the `search` event whenever the user stops typing for 1 second.
 */
@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatPrefix,
    MatIcon,
    MatLabel,
    MatInput
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  /** Event emitted when the search term changes */
  @Output() search = new EventEmitter<string>();

  /** Reactive form control for the search input */
  searchCtrl = new FormControl('');

  constructor() {
    this.searchCtrl.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.search.emit(value?.trim() ?? '');
      });
  }
}
