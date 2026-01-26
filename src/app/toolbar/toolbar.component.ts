import { Component } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FileService } from '../../services/file.service';
import { MatTooltip } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

/**
 * ToolbarComponent
 *
 * Displays the top toolbar with:
 * - Search bar for filtering files
 * - Logout button
 *
 * Uses FileService to update the search query and AuthService to handle logout.
 */
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

  /**
   * @param fileService Service for updating search queries
   * @param router Angular Router for navigation
   * @param authService Service to handle authentication
   */
  constructor(
    private fileService: FileService,
    private router: Router,
    private authService: AuthService
  ) {}

  /**
   * Handles search input and updates the FileService with the query.
   *
   * @param query Search string from the search bar
   */
  onSearch(query: string): void {
    this.fileService.setSearchQuery(query);
    console.log('Searching for:', query);
  }

  /** Logs the user out and clears session/local storage. */
  logout(): void {
    this.authService.logout(this.router);
  }
}
