import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
})
export class SearchFilterComponent {
  @Input() primaryPlaceholder: string = 'Seleccione un Filtro';
  @Input() secondaryPlaceholder: string = 'Buscando';
  @Input() options: Array<{ value: string; label: string }> = [];
  @Input() useMatSelect: boolean = false;
  @Input() secondaryOptions: Array<string> = [];
  @Output() filterApplied = new EventEmitter<string>();
  @Output() selectedOptionChange = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();

  selectedOption: string = '';
  selectedSecondaryOption: string = '';
  searchText: string = '';

  onSelectChange(event: any) {
    this.selectedOptionChange.emit(event.value);
  }

  clearSearch(): void {
    this.searchText = '';
    this.selectedOption = '';
    this.selectedSecondaryOption = '';
    this.clear.emit(); // Emitir el evento de limpiar
  }

  applyFilter() {
    const filterValue = this.useMatSelect
      ? this.selectedSecondaryOption
      : this.searchText;
    this.filterApplied.emit(filterValue); // Emite un objeto con searchText
  }
}
