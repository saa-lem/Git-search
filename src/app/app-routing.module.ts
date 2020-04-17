import { AboutComponent } from './about/about.component';
import { UserProfileComponent } from './Profile/user-profile/user-profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: 'user', component: UserProfileComponent},
  { path: 'about', component: AboutComponent},
  { path: '', redirectTo : 'user', pathMatch :'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
