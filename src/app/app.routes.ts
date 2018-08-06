import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { AppComponent } from './app.component';


export const APP_ROUTES: Routes =  [
   { path: '', component : DashboardComponent },
   { path: 'productos', component: HomeComponent }
];
