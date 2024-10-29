// src/app/heroes/heroes-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { HeroFormComponent } from './components/hero-form/hero-form.component';

const routes: Routes = [
  { path: '', component: HeroListComponent },
  { path: 'add', component: HeroFormComponent },
  { path: 'edit/:id', component: HeroFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroesRoutingModule {}
