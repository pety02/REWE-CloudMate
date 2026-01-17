import { Component } from '@angular/core';
import {LogoComponent} from '../logo/logo.component';
import {SearchBarComponent} from '../search-bar/search-bar.component';
import {MatDivider} from '@angular/material/divider';
import {NavigationBarComponent} from '../navigation-bar/navigation-bar.component';
import {SideNavigationBarComponent} from '../side-navigation-bar/side-navigation-bar.component';
import {MainContentComponent} from '../main-content/main-content.component';
import {InformationCardComponent} from '../information-card/information-card.component';
import {ExternalLinksPanelComponent} from '../external-links-panel/external-links-panel.component';

@Component({
  selector: 'app-home-view',
  imports: [
    LogoComponent,
    SearchBarComponent,
    MatDivider,
    NavigationBarComponent,
    SideNavigationBarComponent,
    MainContentComponent,
    InformationCardComponent,
    ExternalLinksPanelComponent
  ],
  templateUrl: './home-view.component.html',
  styleUrl: './home-view.component.css'
})
export class HomeViewComponent {

}
