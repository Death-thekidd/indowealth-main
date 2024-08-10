import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { title } from 'process';
import { AboutComponent } from './about/about.component';
import { TradingComponent } from './trading/trading.component';

export const routes: Routes = [
  { redirectTo: 'home', path: '', pathMatch: 'full' },
  {
    component: HomeComponent,
    path: 'home',
    data: { title: 'Home' },
  },
  {
    component: AboutComponent,
    path: 'about',
    data: { title: 'About' },
  },
  { component: TradingComponent, path: 'trading', data: { title: 'Trading' } },
];
