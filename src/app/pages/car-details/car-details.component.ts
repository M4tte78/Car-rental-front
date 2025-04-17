import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService, Car } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  car!: Car;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (isNaN(id)) {
      console.error('❌ ID invalide');
      return;
    }

    this.carService.getCarById(id).subscribe({
      next: (car) => {
        this.car = car;
        console.log('✅ Voiture chargée :', car);
      },
      error: (err) => {
        console.error('❌ Erreur lors de la récupération de la voiture :', err);
      }
    });
  }

  getImageUrl(photo: string | undefined): string {
    return photo ? `http://localhost:3000/uploads${photo}` : 'assets/default-car.jpg';
  }
}
