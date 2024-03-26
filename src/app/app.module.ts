import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppbarComponent } from './component/appbar/appbar.component';
import { LoginComponent } from './component/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { SignupComponent } from './component/signup/signup.component';

import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { DepositComponent } from './component/deposit/deposit.component';
import { AdvanceComponent } from './component/advance/advance.component';
import { CustomerComponent } from './component/customer/customer.component';
import { FilterComponent } from './component/filter/filter.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SlideshowComponent } from './component/slideshow/slideshow.component';

@NgModule({
  declarations: [
    AppComponent,
    AppbarComponent,
    LoginComponent,
    DashboardComponent,
    SignupComponent,
    DepositComponent,
    AdvanceComponent,
    CustomerComponent,
    FilterComponent,
    SlideshowComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FormsModule,
    NgxCaptchaModule,
    MatIconModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers:[
    provideClientHydration(),
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
