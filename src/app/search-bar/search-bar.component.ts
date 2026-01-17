import { Component } from '@angular/core';
import {MatFormField, MatInput, MatLabel, MatPrefix} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-search-bar',
  imports: [
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

}
