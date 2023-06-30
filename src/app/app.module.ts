import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { MessageService } from 'primeng/api';
import { AuthGuard } from './guard/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzButtonModule,
    NzIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    
  ],
  providers: [
    ApiService,
    AuthGuard,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
