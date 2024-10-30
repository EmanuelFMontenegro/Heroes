import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export interface Hero {
  id: string;
  superhero: string;
  publisher: string;
  alter_ego: string;
  first_appearance: string;
  characters: string;
  description: string;
}

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

  // // Agregar un nuevo héroe
  // addHero(hero: Hero): Observable<Hero> {
  //   return this.http
  //     .post<Hero>(this.baseUrl, hero)
  //     .pipe(catchError(this.handleError));
  // }

  // Actualizar un héroe existente
  updateHero(hero: Hero): Observable<Hero> {
    return this.http
      .put<Hero>(`${this.baseUrl}/${hero.id}`, hero)
      .pipe(catchError(this.handleError));
  }

  // Eliminar un héroe por ID
  deleteHero(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Este enpoint es solo a modo de simular imagen desde la carpeta public
  getAvailableImages(): Observable<string[]> {
    // Aquí definimos manualmente las imágenes que ya están en la carpeta `public/img`
    const images = [
      '/img/dc-batman.jpg',
      '/img/dc-superman.jpg',
      '/img/dc-wonder.jpg',
      '/img/dc-flash.jpg',
      '/img/marvel-spider.jpg',
    ];
    return of(images);
  }
  //Enpoint por si no se encuentra una IMG se agrega por default
  addHero(hero: any): Observable<any> {
    // Si no hay imagen asignada, se le agrega una imagen predeterminada
    if (!hero.image) {
      hero.image = 'img/dc-superman.jpg'; // Imagen predeterminada que estará en la carpeta `public/img`
    }
    return this.http.post<any>('http://localhost:3000/heroes', hero).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    console.error('Error en la solicitud:', error);
    return throwError(
      () => new Error('Hubo un problema con la solicitud. Inténtalo más tarde.')
    );
  }
}
