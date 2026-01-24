import {Component, OnInit} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {NgForOf, NgIf} from '@angular/common';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-external-links-panel',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatFormField,
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
  externalLinks: string[] = [];

  constructor(private http: HttpClient) {

  }

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
