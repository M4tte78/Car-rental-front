import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCarListComponent } from './admin-car-list.component';

describe('AdminCarListComponent', () => {
  let component: AdminCarListComponent;
  let fixture: ComponentFixture<AdminCarListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCarListComponent]
    });
    fixture = TestBed.createComponent(AdminCarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
