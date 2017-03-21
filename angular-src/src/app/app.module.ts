import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {AuthService} from './services/auth.service';
import {PinsService} from './services/pins.service';

import {FlashMessagesModule} from 'angular2-flash-messages';
import { MasonryModule } from 'angular2-masonry';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddnewComponent } from './components/addnew/addnew.component';

const appRoutes: Routes = [
{path:'', component: HomeComponent},
{path:"profile", component: ProfileComponent},
{path:"add", component: AddnewComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    NavbarComponent,
    AddnewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    MasonryModule
  ],
  providers: [AuthService, PinsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
