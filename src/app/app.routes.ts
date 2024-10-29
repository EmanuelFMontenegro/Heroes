import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'heroes',
    loadChildren: () =>
      import('./heroes/heroes.module').then((m) => m.HeroesModule),
  },
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  { path: '**', redirectTo: '/heroes' },
];
