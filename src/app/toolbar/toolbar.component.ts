import { Component } from '@angular/core';
import {SearchBarComponent} from '../search-bar/search-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {FileService} from '../../services/file.service';
import {MatTooltip} from '@angular/material/tooltip';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

/**
 *
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
   *
   * @param fileService
   * @param router
   */
  constructor(private fileService: FileService, private router: Router, private authService: AuthService) {}

  /**
   *
   * @param query
   */
  onSearch(query: string): void {
    this.fileService.setSearchQuery(query);
    console.log('Searching for:', query);
  }

  /**
   *
   */
  logout(): void {
    this.authService.logout(this.router);
  }
}
