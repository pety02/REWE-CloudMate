import { Component } from '@angular/core';
import {MatDivider} from '@angular/material/divider';
import {NavigationBarComponent} from '../navigation-bar/navigation-bar.component';
import {SideNavigationBarComponent} from '../side-navigation-bar/side-navigation-bar.component';
import {MainContentComponent} from '../main-content/main-content.component';
import {ExternalLinksPanelComponent} from '../external-links-panel/external-links-panel.component';
import {ToolbarComponent} from '../toolbar/toolbar.component';
import {FilePreviewComponent} from '../file-preview/file-preview.component';

@Component({
  selector: 'app-home-view',
  standalone: true,
  imports: [
    MatDivider,
    NavigationBarComponent,
    SideNavigationBarComponent,
    MainContentComponent,
    ExternalLinksPanelComponent,
    ToolbarComponent,
    FilePreviewComponent,
  ],
  templateUrl: './home-view.component.html',
  styleUrl: './home-view.component.css'
})
export class HomeViewComponent {

}
