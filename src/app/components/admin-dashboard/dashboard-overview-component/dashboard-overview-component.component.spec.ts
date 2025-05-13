import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOverviewComponentComponent } from './dashboard-overview-component.component';

describe('DashboardOverviewComponentComponent', () => {
  let component: DashboardOverviewComponentComponent;
  let fixture: ComponentFixture<DashboardOverviewComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardOverviewComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardOverviewComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
