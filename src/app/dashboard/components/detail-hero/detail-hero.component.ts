// detail-hero.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroService, Hero } from '../../../services/hero.service';

import { PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator'; // Importa MatPaginatorModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Para mat-form-field
import { MatInputModule } from '@angular/material/input'; // Para matInput
import { MatButtonModule } from '@angular/material/button'; // Para mat-button
import { MatIconModule } from '@angular/material/icon'; // Para mat-icon
import { MatTableModule } from '@angular/material/table'; // Para mat-table

@Component({
  selector: 'app-detail-hero',
  templateUrl: './detail-hero.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
  ],
})
export class DetailHeroComponent implements OnInit {
  heroes: Hero[] = [];
  filteredHeroes: Hero[] = [];
  searchTerm: string = '';
  pageSize: number = 5;
  currentPage: number = 0;
  totalHeroes: number = 0;

  displayedColumns: string[] = [
    'superhero',
    'alter_ego',
    'publisher',
    'actions',
  ];

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.loadHeroes();
  }

  loadHeroes(): void {
    this.heroService.getHeroes().subscribe((data) => {
      this.heroes = data;
      this.applyFilter();
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredHeroes = this.heroes.filter((hero) =>
      hero.superhero.toLowerCase().includes(term)
    );
    this.totalHeroes = this.filteredHeroes.length;
    this.currentPage = 0;
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
  }

  deleteHero(hero: Hero): void {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${hero.superhero}?`)) {
      this.heroService.deleteHero(hero.id).subscribe(() => {
        this.loadHeroes();
      });
    }
  }
}
