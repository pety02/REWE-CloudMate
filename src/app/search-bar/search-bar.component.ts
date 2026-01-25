import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import {
  MatFormField,
  MatInput,
  MatLabel,
  MatPrefix
} from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';

/**
 *
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
  @Output() search = new EventEmitter<string>();

  /**
   *
   */
  searchCtrl = new FormControl('');

  /**
   *
   */
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
