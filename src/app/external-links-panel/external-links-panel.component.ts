import { Component } from '@angular/core';
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";

@Component({
  selector: 'app-external-links-panel',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatFormField
  ],
  templateUrl: './external-links-panel.component.html',
  styleUrls: [
    './external-links-panel.component.css',
    '../../styles/file/shared-styles.css'
  ]
})
export class ExternalLinksPanelComponent {

}
