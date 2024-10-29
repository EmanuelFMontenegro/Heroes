// src/app/heroes/services/hero.service.ts
import { Injectable } from '@angular/core';
import { Hero } from '../models/hero.models';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesSubject = new BehaviorSubject<Hero[]>([]);
  heroes$ = this.heroesSubject.asObservable();

  constructor() {
    // Datos iniciales
    const initialHeroes: Hero[] = [
      { id: 1, name: 'Superman', alias: 'Clark Kent', superpower: 'Strength', universe: 'DC' },
      { id: 2, name: 'Batman', alias: 'Bruce Wayne', superpower: 'Intelligence', universe: 'DC' },
      { id: 3, name: 'Spiderman', alias: 'Peter Parker', superpower: 'Spider abilities', universe: 'Marvel' },
    ];
    this.heroesSubject.next(initialHeroes);
  }

  getHeroes(): Observable<Hero[]> {
    return this.heroes$;
  }

  getHeroById(id: number): Observable<Hero | undefined> {
    return this.heroes$.pipe(
      map((heroes) => heroes.find((hero) => hero.id === id))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    return this.heroes$.pipe(
      map((heroes) =>
        heroes.filter((hero) => hero.name.toLowerCase().includes(term.toLowerCase()))
      )
    );
  }

  addHero(hero: Hero): void {
    const heroes = this.heroesSubject.getValue();
    hero.id = this.generateId();
    this.heroesSubject.next([...heroes, hero]);
  }

  updateHero(updatedHero: Hero): void {
    const heroes = this.heroesSubject.getValue();
    const index = heroes.findIndex((hero) => hero.id === updatedHero.id);
    if (index !== -1) {
      heroes[index] = updatedHero;
      this.heroesSubject.next([...heroes]);
    }
  }

  deleteHero(id: number): void {
    const heroes = this.heroesSubject.getValue();
    this.heroesSubject.next(heroes.filter((hero) => hero.id !== id));
  }

  private generateId(): number {
    const heroes = this.heroesSubject.getValue();
    return heroes.length > 0 ? Math.max(...heroes.map((hero) => hero.id)) + 1 : 1;
  }
}
