import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService, Car } from 'src/app/services/car.service';

@Component({
  selector: 'app-admin-car-reservation',
  templateUrl: './admin-car-reservation.component.html',
  styleUrls: ['./admin-car-reservation.component.css']
})
export class AdminCarReservationComponent implements OnInit {
  car!: Car;

  constructor(private route: ActivatedRoute, private carService: CarService) {}

  ngOnInit(): void {
    const carId = Number(this.route.snapshot.paramMap.get('id'));
    this.carService.getCarById(carId).subscribe(car => {
      this.car = car;
    });
  }

  cancelReservation() {
  if (!this.car?.id) return;

  this.carService.cancelReservation(this.car.id).subscribe(() => {
    alert('Réservation annulée avec succès');
    this.ngOnInit(); // Recharge la voiture
  });
}

}
