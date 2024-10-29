// src/app/heroes/components/hero-list/hero-list.component.ts
import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../models/hero.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss'],
})
export class HeroListComponent implements OnInit {
  heroes: Hero[] = [];
  filteredHeroes: Hero[] = [];
  searchTerm: string = '';
  pageSize: number = 5;
  currentPage: number = 1;

  constructor(private heroService: HeroService, private router: Router) {}

  ngOnInit(): void {
    this.heroService.getHeroes().subscribe((heroes) => {
      this.heroes = heroes;
      this.applyFilter();
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredHeroes = this.heroes.filter((hero) =>
      hero.name.toLowerCase().includes(term)
    );
    this.currentPage = 1;
  }

  deleteHero(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este héroe?')) {
      this.heroService.deleteHero(id);
    }
  }

  editHero(id: number): void {
    this.router.navigate(['/heroes/edit', id]);
  }

  addHero(): void {
    this.router.navigate(['/heroes/add']);
  }

  get paginatedHeroes(): Hero[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredHeroes.slice(startIndex, startIndex + this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage * this.pageSize < this.filteredHeroes.length) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
