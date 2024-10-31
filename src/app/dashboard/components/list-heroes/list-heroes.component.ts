import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../../services/hero.service';
import { Hero } from '../../../models/hero.models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIcon } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogComponent } from '../../../shared/components/mat-dialog/mat-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { SearchFilterComponent } from '../../../shared/components/search-filter/search-filter.component';

@Component({
  selector: 'app-list-heroes',
  templateUrl: './list-heroes.component.html',
  styleUrls: ['./list-heroes.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    NgxPaginationModule,
    MatIcon,
    RouterModule,
    MatSelectModule,
    MatButtonModule,
    SearchFilterComponent,
  ],
})
export class ListHeroesComponent implements OnInit {
  heroes: Hero[] = [];
  currentPage: number = 1;
  searchText: string = 'Seleccione un Filtro';
  filteredHeroes: Hero[] = [];
  searchOptions: { value: string; label: string }[] = [
    { value: 'name', label: 'Nombre de Héroe' },
    { value: 'parameter', label: 'Parámetro de Nombre' },
  ];
  useMatSelect: boolean = true;
  heroNames: string[] = [];
  heroId: number[] = [];
  selectedOption: string = '';
  selectedHeroName: string = '';
  selectedHeroId: number | null = null;
  selectedSecondaryOption: string = '';

  constructor(
    private heroService: HeroService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadHeroes();
  }

  editHero(hero: Hero): void {
    localStorage.setItem('heroData', JSON.stringify(hero));
    this.router.navigate(['dashboard/edit-hero', hero.id]);
  }
  loadHeroes(): void {
    this.heroService.getHeroes().subscribe(
      (data) => {
        this.heroes = data.map((hero) => ({
          ...hero,
          id: Number(hero.id), // Convierte id a número
          comic: hero.comic || 'default', // Usa 'default' si comic es undefined
        }));
        this.filteredHeroes = [...this.heroes];
        this.heroNames = this.heroes.map((hero) => hero.superhero);
        this.heroId = this.heroes.map((hero) => hero.id); // Asegúrate de que hero.id sea de tipo `number`
      },
      (error) => {
        console.error('Error al cargar los héroes:', error);
        this.toastr.error('No se pudieron cargar los héroes', 'Error');
      }
    );
  }

  // Método para obtener el héroe por nombre
  filterHero(): void {
    if (this.selectedHeroName) {
      const selectedHero = this.heroes.find(
        (hero) => hero.superhero === this.selectedHeroName
      );

      if (selectedHero) {
        this.filteredHeroes = [selectedHero]; // Mostrar solo el héroe seleccionado
      } else {
        this.toastr.warning('Héroe no encontrado', 'Advertencia');
        this.filteredHeroes = []; // Limpiar la lista si no se encuentra
      }
    } else {
      this.toastr.warning('Por favor selecciona un héroe', 'Advertencia');
      this.filteredHeroes = []; // Limpiar la lista si no se selecciona nada
    }
  }
  resetPaginator(): void {
    this.currentPage = 1;
  }

  openDeleteDialog(hero: Hero): void {
    const dialogRef = this.dialog.open(MatDialogComponent, {
      data: { itemName: hero.superhero },
    });
    dialogRef.componentInstance.confirmDeleteEvent.subscribe(() => {
      this.heroService.deleteHero(hero.id).subscribe(
        () => {
          this.toastr.success('Héroe eliminado exitosamente', 'Éxito');
          this.loadHeroes();
          this.resetPaginator();
        },
        (error) => {
          this.toastr.error('Error al eliminar el héroe', 'Error');
        }
      );
    });
  }

  onFilterApplied(searchText: string): void {


    // Intentamos convertir el texto de búsqueda a un número
    const parsedId = Number(searchText);

    if (this.selectedOption === 'name') {
      // Buscar el héroe por nombre
      const selectedHero = this.heroes.find(
        (hero) => hero.superhero.toLowerCase() === searchText.toLowerCase()
      );
      if (selectedHero) {
        this.filteredHeroes = [selectedHero]; // Mostrar solo el héroe encontrado
      } else {
        this.toastr.warning('Héroe no encontrado', 'Advertencia');
        this.filteredHeroes = []; // Limpiar la lista si no se encuentra
      }
    } else if (this.selectedOption === 'parameter') {
      // Búsqueda por parámetro
      this.filteredHeroes = this.heroes.filter((hero) =>
        hero.superhero.toLowerCase().includes(searchText.toLowerCase())
      );
    } else {
      // Si seleccionamos buscar por ID
      if (!isNaN(parsedId)) {
        this.heroService.getHeroById(String(parsedId)).subscribe(
          // Convertir parsedId a string
          (hero) => {
           
            this.filteredHeroes = [hero]; // Mostrar solo el héroe encontrado
          },
          (error) => {
            console.error('Error al buscar héroe por ID:', error);
            this.toastr.error('No se encontró un héroe con ese ID', 'Error');
            this.filteredHeroes = []; // Limpiar la lista si no se encuentra
          }
        );
      } else {
        this.toastr.warning('Por favor ingresa un ID válido', 'Advertencia');
        this.filteredHeroes = []; // Limpiar la lista si el ID no es válido
      }
    }
  }

  onSelectChange(option: string): void {
    this.selectedOption = option;
    this.resetPaginator();

    // Determinar si usar mat-select o un campo de texto.
    this.useMatSelect = option === 'name';

    if (option === 'name') {
      this.filteredHeroes = [...this.heroes];
    } else {
      this.filteredHeroes = [...this.heroes];
    }
  }
  applyFilter(): void {
    // Lógica para aplicar el filtro
    this.filteredHeroes = this.heroes.filter((hero) =>
      hero.superhero.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  clearInputs(): void {
    this.selectedOption = '';
    this.currentPage = 1;
    this.loadHeroes(); // Recargar la lista de héroes
  }
}
