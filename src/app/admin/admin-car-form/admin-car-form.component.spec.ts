import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCarFormComponent } from './admin-car-form.component';

describe('AdminCarFormComponent', () => {
  let component: AdminCarFormComponent;
  let fixture: ComponentFixture<AdminCarFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCarFormComponent]
    });
    fixture = TestBed.createComponent(AdminCarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
