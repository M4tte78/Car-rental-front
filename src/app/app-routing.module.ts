import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarListComponent } from './components/car-list/car-list.component';
import { HomeComponent } from './components/home/home.component';
import { AdminCarListComponent } from './admin/admin-car-list/admin-car-list.component';
import { CarReservationComponent } from './components/car-reservation/car-reservation.component';
import { AdminCarReservationComponent } from './admin/admin-car-reservation/admin-car-reservation.component';
import { CarDetailsComponent } from './pages/car-details/car-details.component';

const routes: Routes = [

  { path: 'cars', 
    component: CarListComponent },
  { path: '', 
    component: HomeComponent },
  { path: 'admin', 
    component: AdminCarListComponent },
  { path: 'reservation/:id', 
    component: CarReservationComponent },
  { path: 'admin/reservations/:id', 
    component: AdminCarReservationComponent },
  { path: 'cars/:id', 
    component: CarDetailsComponent }
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
