import { Component, OnInit } from '@angular/core';
import { CycleTypeService } from '../../../services/cycle-type.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-cycle-types',
  imports: [CommonModule, FormsModule],
  templateUrl: './view-cycle-types.component.html',
  styleUrl: './view-cycle-types.component.css'
})
export class ViewCycleTypesComponent implements OnInit {

  // cycleTypes: any[] = [];

  // constructor(private cycleTypeService: CycleTypeService) {}

  // ngOnInit(): void {
  //   this.fetchCycleTypes();
  // }

  // // Fetch all cycle types from API
  // fetchCycleTypes() {
  //   this.cycleTypeService.getCycleTypes().subscribe({
  //     next: (data) => {
  //       this.cycleTypes = data;
  //     },
  //     error: (err) => {
  //       console.error('Error fetching cycle types:', err);
  //       alert('Failed to load cycle type details.');
  //     }
  //   });
  // }

  cycleTypes: any[] = [];
  isModalOpen = false;
  isEditMode = false;
  newCycleType: any = { name: '' };
  currentCycleType: any = { name: '' };

  constructor(private cycleTypeService: CycleTypeService) {}

  ngOnInit(): void {
    this.fetchCycleTypes();
  }

  fetchCycleTypes() {
    this.cycleTypeService.getCycleTypes().subscribe({
      next: (data) => {
        this.cycleTypes = data;
      },
      error: (err) => {
        console.error('Error fetching cycle types:', err);
        alert('Failed to load cycle type details.');
      }
    });
  }

  openAddModal() {
    this.isModalOpen = true;
    this.isEditMode = false;
    this.currentCycleType = { name: '' };
  }

  openEditModal(cycleType: any){
    this.isEditMode = true;
    this.currentCycleType = { ...cycleType };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.currentCycleType = { name: '' }; // Reset form
  }

  addCycleType() {
    this.cycleTypeService.addCycleType(this.currentCycleType).subscribe({
      next: () => {
        alert('Cycle Type added successfully!');
        this.closeModal();
        this.fetchCycleTypes(); // Refresh the cycle types list
      },
      error: (err) => {
        console.error('Error adding cycle type:', err);
        alert('Failed to add cycle type.');
      }
    });
  }

  updateCycleType() {
    this.cycleTypeService.editCycleType(this.currentCycleType.typeID, this.currentCycleType).subscribe({
      next: () => {
        alert('Cycle Type updated successfully!');
        this.closeModal();
        this.fetchCycleTypes();
      },
      error: (err) => {
        console.error('Error updating cycle type:', err);
        alert('Failed to update cycle type.');
      }
    });
  }

  deleteCycleType(typeId: string) {
    if (confirm('Are you sure you want to delete this cycle type?')) {
      this.cycleTypeService.deleteCycleType(typeId).subscribe({
        next: () => {
          alert('Cycle Type deleted successfully!');
          this.fetchCycleTypes();
        },
        error: (err) => {
          console.error('Error deleting cycle type:', err);
          alert('Failed to delete cycle type.');
        }
      });
    }
  }

}
