import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {HttpClient} from '@angular/common/http';

/**
 * ExternalLinksPanelComponent
 *
 * Loads a list of external links from a JSON file and displays them.
 * Handles errors gracefully by falling back to an empty array.
 */
@Component({
  selector: 'app-external-links-panel',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './external-links-panel.component.html',
  styleUrls: [
    './external-links-panel.component.css',
    '../../styles/file/shared-styles.css'
  ]
})
export class ExternalLinksPanelComponent implements OnInit {

  /** Array of external links loaded from server */
  externalLinks: string[] = [];

  /**
   * @param http Angular HttpClient for loading JSON data
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Lifecycle hook: Fetches external links JSON on component initialization.
   * Logs success or error to the console.
   */
  ngOnInit(): void {
    this.http.get<string[]>('/external-links.json').subscribe({
      next: (links: string[]) => {
        this.externalLinks = links;
        console.log('External links loaded:', this.externalLinks);
      },
      error: (err) => {
        console.error('Failed to load external links', err);
        this.externalLinks = [];
      },
    });
  }
}
