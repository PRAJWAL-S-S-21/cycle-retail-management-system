import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCyclesComponent } from './view-cycles.component';

describe('ViewCyclesComponent', () => {
  let component: ViewCyclesComponent;
  let fixture: ComponentFixture<ViewCyclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCyclesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCyclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
