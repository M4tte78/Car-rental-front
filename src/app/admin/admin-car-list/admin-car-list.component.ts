import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CarService, Car } from 'src/app/services/car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-car-list',
  templateUrl: './admin-car-list.component.html',
  styleUrls: ['./admin-car-list.component.css']
})
export class AdminCarListComponent implements OnInit {
  cars: Car[] = [];
  selectedCar: Car | null = null;

  @ViewChild('editForm') editFormRef!: ElementRef<HTMLFormElement>;

  constructor(
    private carService: CarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.carService.getAllCars().subscribe(data => {
      this.cars = data;
    });
  }

  editCar(car: Car): void {
    this.selectedCar = { ...car };

    setTimeout(() => {
      this.editFormRef?.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

  onCarSaved(): void {
    this.selectedCar = null;
    this.loadCars();
  }

  deleteCar(id: number): void {
    if (confirm('Confirmer la suppression de ce véhicule ?')) {
      this.carService.deleteCar(id).subscribe(() => {
        this.loadCars();
      });
    }
  }

  viewReservations(carId: number): void {
    this.router.navigate(['/admin/reservations', carId]);
  }
}
