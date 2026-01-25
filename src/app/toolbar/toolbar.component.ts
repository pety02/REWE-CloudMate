import { Component } from '@angular/core';
import {SearchBarComponent} from '../search-bar/search-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {FileService} from '../file-card/file.service';
import {MatTooltip} from '@angular/material/tooltip';
import {Router} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    SearchBarComponent,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltip,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  constructor(private fileService: FileService, private router: Router) {}

  onSearch(query: string): void {
    this.fileService.setSearchQuery(query);
    console.log('Searching for:', query);
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('currentFileContent');
    localStorage.removeItem('openedFile');
    localStorage.removeItem('sharedFile');
    localStorage.removeItem('sortedFiles');

    this.router.navigate(['']).then(p => p);
  }
}
