import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService, Car } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];
  animatingIds: number[] = [];
  searchTerm: string = '';
  

  constructor(private carService: CarService, private router: Router) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.carService.getAllCars().subscribe({
      next: (data) => {
        this.cars = data;
      },
      error: (err) => console.error('Erreur lors du chargement des voitures :', err),
    });
  }

  filteredCars(): Car[] {
    if (!this.searchTerm?.trim()) return this.cars;
  
    const term = this.searchTerm.toLowerCase();
    return this.cars.filter(car =>
      car.brand?.toLowerCase().includes(term) ||
      car.model?.toLowerCase().includes(term) ||
      car.description?.toLowerCase().includes(term)
    );
  }

  goToDetails(id: number): void {
    this.router.navigate(['/cars', id]);
  }

  loadAvailableCars(): void {
    this.carService.getAvailableCars().subscribe({
      next: (data) => {
        this.cars = data;
      },
      error: (err) => console.error('Erreur lors du chargement des voitures :', err),
    });
  }

  likeCar(carId: number | undefined): void {
    if (!carId) return;

    this.animatingIds.push(carId); // ajoute l’ID en cours d'animation

    this.carService.likeCar(carId).subscribe({
      next: () => {
        this.loadCars(); // recharge les données avec le nouveau like
        setTimeout(() => {
          this.animatingIds = this.animatingIds.filter(id => id !== carId);
        }, 300); // durée de l’animation (même que celle définie en CSS)
      },
      error: (err) => console.error('Erreur lors du like :', err),
    });
  }

  getImageUrl(photo: string | undefined): string {
    return photo ? `http://localhost:3000/uploads${photo}` : 'assets/default-car.jpg';
  }
}
