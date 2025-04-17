import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarReservationComponent } from './car-reservation.component';

describe('CarReservationComponent', () => {
  let component: CarReservationComponent;
  let fixture: ComponentFixture<CarReservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarReservationComponent]
    });
    fixture = TestBed.createComponent(CarReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
