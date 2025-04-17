import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AdminCarListComponent } from './admin/admin-car-list/admin-car-list.component';
import { AdminCarFormComponent } from './admin/admin-car-form/admin-car-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CarReservationComponent } from './components/car-reservation/car-reservation.component';

// 📅 FullCalendar
import { FullCalendarModule } from '@fullcalendar/angular';
import { AdminCarReservationComponent } from './admin/admin-car-reservation/admin-car-reservation.component';
import { CarDetailsComponent } from './pages/car-details/car-details.component';
import { BrandColorPipe } from './pipes/brand-color.pipe';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    HomeComponent,
    LayoutComponent,
    NavbarComponent,
    FooterComponent,
    AdminCarListComponent,
    AdminCarFormComponent,
    CarReservationComponent,
    AdminCarReservationComponent,
    CarDetailsComponent,
    BrandColorPipe,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
