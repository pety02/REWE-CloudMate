import {Component} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';

/**
 * FilePreviewComponent
 *
 * Simple component to display the content of a file stored in localStorage.
 */
@Component({
  selector: 'app-file-preview',
  imports: [
    MatFormField,
    MatLabel,
    MatInput
  ],
  templateUrl: './file-preview.component.html',
  styleUrls: [
    './file-preview.component.css',
    '../../styles/file/shared-styles.css'
  ]
})
export class FilePreviewComponent {

  /**
   * Retrieves the current file content from localStorage.
   *
   * @returns File content as string
   */
  updateContent(): string {
    return localStorage.getItem('currentFileContent') || '';
  }
}
