import { Component } from '@angular/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';

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

}
