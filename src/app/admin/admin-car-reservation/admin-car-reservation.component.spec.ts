import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCarReservationComponent } from './admin-car-reservation.component';

describe('AdminCarReservationComponent', () => {
  let component: AdminCarReservationComponent;
  let fixture: ComponentFixture<AdminCarReservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCarReservationComponent]
    });
    fixture = TestBed.createComponent(AdminCarReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
