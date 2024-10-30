import { Component, OnInit } from '@angular/core';
import { HeroService, Hero } from '../../../services/hero.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIcon } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

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
  ],
})
export class ListHeroesComponent implements OnInit {
  heroes: Hero[] = [];
  currentPage: number = 1;
  selectedHeroId: string = ''; // Para seleccionar héroe por ID
  searchText: string = ''; // Para búsqueda por texto

  constructor(private heroService: HeroService, private router: Router) {}

  ngOnInit(): void {
    this.loadHeroes();
  }

  editHero(hero: Hero): void {
    localStorage.setItem('heroData', JSON.stringify(hero));
    this.router.navigate(['dashboard/edit-hero', hero.id]);
  }

  loadHeroes(): void {
    this.heroService.getHeroes().subscribe((data) => {
      this.heroes = data;
    });
  }
}
