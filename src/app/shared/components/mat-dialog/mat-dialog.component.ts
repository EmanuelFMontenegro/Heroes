import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mat-dialog',
  templateUrl: './mat-dialog.component.html',
  styleUrls: ['./mat-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule
  ]
})
export class MatDialogComponent {
  // Evento para notificar la acción de eliminación
  @Output() confirmDeleteEvent = new EventEmitter<void>();

  constructor(
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<MatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { itemName: string } // Recibir el nombre del elemento como dato inyectado
  ) {}

  confirmDelete(): void {
    this.confirmDeleteEvent.emit(); // Emite el evento para realizar la acción de eliminación
    this.dialogRef.close(true); // Cierra el diálogo indicando éxito
  }

  cancelDelete(): void {
    this.dialogRef.close(false); // Cierra el diálogo indicando cancelación
  }
}
