import { Routes } from '@angular/router';
import {AuthTabsComponent} from './auth/components/auth-tabs/auth-tabs.component';
import {HomeViewComponent} from './home-view/home-view.component';

export const routes: Routes = [
  { path: '', component: AuthTabsComponent },
  { path: 'home', component: HomeViewComponent }
];
