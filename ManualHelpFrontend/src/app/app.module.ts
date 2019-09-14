import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {LoginComponent} from "../app/auth/login/login.component";
import { ApiService } from "./services/common/api.service";

import {DynamicNotifyService} from "./services/common/dynamic-notify.service";
import {NotifyService} from "./services/common/notify.service";
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormvalidatorService } from "../app/services/common/formvalidator.service";
import { JwtInterceptor, } from  '../app/helpers/jwt.interceptor';
import {AuthGuard} from "../app/guards/auth.guard";
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatToolbarModule,
  MatButtonModule,
} from '@angular/material';


const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },   
  { path: 'my-account', loadChildren: './pages/UserPages/user.module#UserModule'},
  { path: 'user', loadChildren: './pages/Profile/user.module#UserModule'},
  
];


@NgModule({
  declarations: [
    AppComponent,  
    RegisterComponent,   
    LoginComponent,
    // MyNewsfeedComponent,
    // PeopleNearlyComponent,
    // FriendsComponent,
    // ImagesComponent,
    // VideosComponent,
    // TimelineComponent,
    // FriendsTemplateComponent    
  ],
  imports: [
    FlexLayoutModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    }),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    MatToolbarModule,
    MatButtonModule,

    BrowserModule.withServerTransition({ appId: 'my-app' }),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToasterModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers:
    [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      ApiService,
      DynamicNotifyService,
      NotifyService,
      ToasterService,
      FormvalidatorService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
