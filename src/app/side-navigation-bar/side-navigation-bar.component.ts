import { Component } from '@angular/core';
import {MatDrawer, MatDrawerContainer} from '@angular/material/sidenav';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-side-navigation-bar',
  imports: [
    MatDrawerContainer,
    MatDrawer,
    MatButton,
    MatIcon
  ],
  templateUrl: './side-navigation-bar.component.html',
  styleUrl: './side-navigation-bar.component.css'
})
export class SideNavigationBarComponent {
}
