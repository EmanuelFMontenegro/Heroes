import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Hero } from '../models/hero.models';
@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private baseUrl = 'http://localhost:3000/heroes';

  constructor(private http: HttpClient) {}

  // Obtener todos los héroes
  getHeroes(): Observable<Hero[]> {
    return this.http
      .get<Hero[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  // Obtener un héroe por ID
  getHeroById(id: string): Observable<Hero> {
    return this.http
      .get<Hero>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Buscar héroes por nombre
  searchHeroes(term: string): Observable<Hero[]> {
    return this.http
      .get<Hero[]>(`${this.baseUrl}?superhero_like=${term}`)
      .pipe(catchError(this.handleError));
  }

  // Actualizar un héroe existente
  updateHero(hero: Hero): Observable<Hero> {
    return this.http
      .put<Hero>(`${this.baseUrl}/${hero.id}`, hero)
      .pipe(catchError(this.handleError));
  }

  // Eliminar un héroe por ID
  deleteHero(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  //Enpoint para agregar Heroes
  addHero(hero: any): Observable<any> {
     hero.id = String(hero.id);
    return this.http
      .post<any>(`${this.baseUrl}`, hero)
      .pipe(catchError(this.handleError));
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    console.error('Error en la solicitud:', error);
    return throwError(
      () => new Error('Hubo un problema con la solicitud. Inténtalo más tarde.')
    );
  }
}
