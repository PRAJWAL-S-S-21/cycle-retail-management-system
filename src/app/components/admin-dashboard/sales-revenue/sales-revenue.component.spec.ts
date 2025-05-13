import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesRevenueComponent } from './sales-revenue.component';

describe('SalesRevenueComponent', () => {
  let component: SalesRevenueComponent;
  let fixture: ComponentFixture<SalesRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesRevenueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
