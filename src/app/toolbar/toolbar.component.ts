import { Component } from '@angular/core';
import {SearchBarComponent} from '../search-bar/search-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {FileService} from '../file-card/file.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    SearchBarComponent,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  constructor(private fileService: FileService) {}

  onSearch(query: string): void {
    this.fileService.setSearchQuery(query);
    console.log('Searching for:', query);
  }
}
