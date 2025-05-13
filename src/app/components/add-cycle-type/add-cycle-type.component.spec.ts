import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCycleTypeComponent } from './add-cycle-type.component';

describe('AddCycleTypeComponent', () => {
  let component: AddCycleTypeComponent;
  let fixture: ComponentFixture<AddCycleTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCycleTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCycleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
