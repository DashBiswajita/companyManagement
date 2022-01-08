import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CommonComponent } from './about/common/common.component';
import { AuthGuard } from './auth.guard';
import { ContactComponent } from './contact/contact.component';
import { FeaturesComponent } from './features/features.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { RaiseTicketComponent } from './raise-ticket/raise-ticket.component';

const routes: Routes = [
  {path :  'logIn', component : LoginComponent},
  {path :  'contact', component : ContactComponent,canActivate: [AuthGuard]},
  {path :  'ticketRaise', component : RaiseTicketComponent,canActivate: [AuthGuard]},
  {path :  'about', component : AboutComponent, canActivate: [AuthGuard],
   children : [
    {path : ':type', component: CommonComponent},
    {path : 'profile', redirectTo : ':type',pathMatch: "full"},
    {path : '', redirectTo : 'profile', pathMatch : "full"}
   ]
  },
  {path :  'home', component : HomeComponent,
     children : [
       {path : ':type', component: FeaturesComponent},
       {path : 'domestic', redirectTo : ':type',pathMatch: "full"},
       {path : '', redirectTo : 'domestic', pathMatch : "full"}
     ],
     canActivate: [AuthGuard]
  },
  {path : '', redirectTo : 'logIn', pathMatch : "full"},
  {path : '**', component : NoPageFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
