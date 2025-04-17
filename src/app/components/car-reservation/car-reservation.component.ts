import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService, Car } from 'src/app/services/car.service';

import { CalendarOptions, DateSelectArg, DateSpanApi } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-car-reservation',
  templateUrl: './car-reservation.component.html',
  styleUrls: ['./car-reservation.component.css']
})
export class CarReservationComponent implements OnInit {
  car!: Car;
  form!: FormGroup;

  reservedFrom: string = '';
  reservedTo: string = '';
  totalPrice: number = 0;

  calendarOptions!: CalendarOptions;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      customerName: [''],
      customerEmail: ['']
    });
  }

  ngOnInit(): void {
    const carId = Number(this.route.snapshot.paramMap.get('id'));

      this.carService.getCarById(carId).subscribe(car => {
        this.car = car;

        if (!this.car.available) {
          alert("Ce véhicule est actuellement indisponible à la réservation.");
          this.router.navigate(['/cars']);
          return;
        }
  
      const reservedFrom = new Date(car.reservedFrom as unknown as string);
      const reservedTo = new Date(car.reservedTo as unknown as string);
      reservedTo.setDate(reservedTo.getDate() + 1); // pour que le dernier jour soit inclus
  
      // Initialisation du calendrier AVEC les events de réservation
      this.calendarOptions = {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        selectable: true,
        selectMirror: true,
        height: 500,
        selectAllow: this.checkDateAvailability.bind(this),
        select: this.handleDateSelect.bind(this),
        events: [
          {
            title: 'Réservé',
            start: reservedFrom.toISOString().split('T')[0], // format ISO YYYY-MM-DD
            end: this.addOneDay(reservedTo.toISOString().split('T')[0]), // pour inclure la dernière journée
            display: 'background',
            color: '#ff000055'
          }
        ]
      };
      
    });
  }
  
  
  

  handleDateSelect(selectInfo: DateSelectArg): void {
    const start = new Date(selectInfo.start);
    const end = new Date(selectInfo.end);
    end.setDate(end.getDate() - 1);

    if (end < start) {
      this.reservedFrom = '';
      this.reservedTo = '';
      this.totalPrice = 0;
      return;
    }

    this.reservedFrom = start.toISOString().split('T')[0];
    this.reservedTo = end.toISOString().split('T')[0];

    const timeDiff = end.getTime() - start.getTime();
    const days = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1;

    this.totalPrice = (this.car?.price && days > 0) ? this.car.price * days : 0;
  }

  
  

  checkDateAvailability(selectInfo: any): boolean {
    const start = new Date(selectInfo.start);
    const end = new Date(selectInfo.end);
    end.setDate(end.getDate() - 1);
  
    if (this.car.reservedFrom && this.car.reservedTo && !this.car.available) {
      const reservedStart = new Date(this.car.reservedFrom);
      const reservedEnd = new Date(this.car.reservedTo);
  
      if (start <= reservedEnd && end >= reservedStart) {
        return false;
      }
    }
  
    return true;
  }
  

  addOneDay(dateStr: string): string {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
  }
  
  

  getImageUrl(photo: string | undefined): string {
    return photo ? `http://localhost:3000/uploads${photo}` : 'assets/default-car.jpg';
  }

  submit(): void {
    if (!this.reservedFrom || !this.reservedTo) {
      alert('Veuillez sélectionner une plage de dates.');
      return;
    }

    const data = {
      ...this.form.value,
      reservedFrom: this.reservedFrom,
      reservedTo: this.reservedTo,
      available: false
    };

    this.carService.updateCar(this.car.id!, this.createFormData(data)).subscribe(() => {
      alert('Réservation confirmée !');
      this.router.navigate(['/cars']);
    });
  }

  createFormData(data: any): FormData {
    const formData = new FormData();
    for (let key in data) {
      const value = data[key];
      if (value !== null && value !== undefined && value !== '') {
        formData.append(key, value);
      }
    }
    return formData;
  }
  
}
