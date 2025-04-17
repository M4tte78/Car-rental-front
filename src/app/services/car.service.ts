import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

export interface Car {
  id?: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  description: string;
  photo?: string;
  likes?: number;
  available: boolean;
  reservedFrom?: Date;
  reservedTo?: Date;
  customerName?: string;
  customerEmail?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarService {
  
  private baseUrl = 'http://localhost:3000/api/cars';

  constructor(private http: HttpClient) {}

  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.baseUrl);
  }

  getAvailableCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.baseUrl}/available`);
  }

  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.baseUrl}/${id}`).pipe(
        tap((data: Car) => console.log('Car details:', data))
      )
  }

  getReservationsByCarId(carId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${carId}/reservations`);
  }
  
  

  createCar(car: FormData): Observable<Car> {
    return this.http.post<Car>(this.baseUrl, car);
  }

  updateCar(id: number, car: FormData): Observable<Car> {
    console.log(car)
    return this.http.put<Car>(`${this.baseUrl}/${id}`, car);
  }

  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  likeCar(id: number): Observable<Car> {
    return this.http.post<Car>(`${this.baseUrl}/${id}/like`, {});
  }

  searchCars(query: string): Observable<Car[]> {
    const params = new HttpParams().set('q', query);
    return this.http.get<Car[]>(`${this.baseUrl}/search`, { params });
  }

  cancelReservation(carId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${carId}/cancel-reservation`, {});
  }
  

  
  
}
