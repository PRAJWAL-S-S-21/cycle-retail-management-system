import { Component } from '@angular/core';
import { CycleTypeService } from '../../services/cycle-type.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-cycle-type',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-cycle-type.component.html',
  styleUrl: './add-cycle-type.component.css'
})
export class AddCycleTypeComponent {

  newCycleType: any = { name: '' };

  constructor(private cycleTypeService: CycleTypeService) {}

  addCycleType() {
    this.cycleTypeService.addCycleType(this.newCycleType).subscribe({
      next: () => {
        alert('Cycle Type added successfully!');
        this.newCycleType = {}; // Reset form
      },
      error: (err) => {
        console.error('Error adding cycle type:', err);
        alert('Failed to add cycle type.');
      }
    });
  }

  cancel() {
    this.newCycleType = { name: '' }; // Reset form
    // Optionally navigate back or close modal
  }

}
