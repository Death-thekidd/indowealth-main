import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { title } from 'process';
import { AboutComponent } from './about/about.component';
import { TradingComponent } from './trading/trading.component';
import { MissionComponent } from './mission/mission.component';
import { VisionComponent } from './vision/vision.component';
import { BlogComponent } from './blog/blog.component';
import { BlogContentComponent } from './blog-content/blog-content.component';

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
  { component: MissionComponent, path: 'mission', data: { title: 'Mission' } },
  { component: VisionComponent, path: 'vision', data: { title: 'Vision' } },
  { component: BlogComponent, path: 'blogs', data: { title: 'Blogs' } },
  {
    component: BlogContentComponent,
    path: 'blog-content',
    data: { title: 'BlogContent' },
  },
];
