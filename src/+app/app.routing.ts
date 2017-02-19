import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutControlio } from './pages/about_controlio.component';
import { MainPageComponent } from "./MainPage";
import { ErrorPage } from "./pages/error-page.component";



const appRoutes: Routes = [
  { path: '', component: MainPageComponent, pathMatch: 'full' },
  { path: 'main', component: MainPageComponent },
  { path: 'about', component: AboutControlio },
  { path: '**', component: ErrorPage }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
