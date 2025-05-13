import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCycleTypesComponent } from './view-cycle-types.component';

describe('ViewCycleTypesComponent', () => {
  let component: ViewCycleTypesComponent;
  let fixture: ComponentFixture<ViewCycleTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCycleTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCycleTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
