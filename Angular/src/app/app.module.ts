import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 
import { AppRoutingModule } from './app-routing.module'; 
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserService } from './user.service';

@NgModule({
  declarations: [AppComponent, UserComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule, AppRoutingModule, ReactiveFormsModule],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
