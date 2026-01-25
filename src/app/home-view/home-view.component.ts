import { Component } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { SideNavigationBarComponent } from '../side-navigation-bar/side-navigation-bar.component';
import { ExternalLinksPanelComponent } from '../external-links-panel/external-links-panel.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { FilePreviewComponent } from '../file-preview/file-preview.component';
import { MainContentComponent } from '../files-loading/components/main-content/main-content.component';
import { SortingNavBarComponent } from '../files-loading/components/sorting-nav-bar/sorting-nav-bar.component';

@Component({
  selector: 'app-home-view',
  standalone: true,
  imports: [
    MatDivider,
    SideNavigationBarComponent,
    MainContentComponent,
    ExternalLinksPanelComponent,
    ToolbarComponent,
    FilePreviewComponent,
    SortingNavBarComponent,
  ],
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent {
}
