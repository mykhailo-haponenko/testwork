import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../app/app.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ListComponent } from './components/list/list.component';
import { MapComponent } from './components/map/map.component';
import { AuthService as AuthGourd } from './services/auth.service';

const routes: Routes = [
{ path: '', component: AppComponent},
{ path: 'login', component: LoginComponent},
{ path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGourd]},
{ path: 'profile', component: ProfileComponent, canActivate: [AuthGourd]},
{ path: 'list', component: ListComponent, canActivate: [AuthGourd]},
{ path: 'map', component: MapComponent, canActivate: [AuthGourd] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
