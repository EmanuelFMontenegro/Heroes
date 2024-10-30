import { Component, EventEmitter, Output, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [MatSelectModule, MatIconModule, FormsModule],
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'], // Asegúrate de que sea styleUrls, no styleUrl
})
export class SearchFilterComponent {
  @Input() options: string[] = []; // Opciones para el mat-select
  @Output() filterApplied = new EventEmitter<{
    selected: string;
    searchText: string;
  }>();

  selectedOption: string = '';
  searchText: string = '';

  onSelectChange(change: MatSelectChange): void {
    // Lógica al seleccionar una opción (si es necesario)
    console.log('Opción seleccionada:', change.value);
  }

  clearSearch(): void {
    this.searchText = '';
    this.selectedOption = '';
  }

  applyFilter(): void {
    this.filterApplied.emit({
      selected: this.selectedOption,
      searchText: this.searchText,
    });
  }
}
