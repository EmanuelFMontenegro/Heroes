// dashboard-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from '../layouts/dashboard-layout/dashboard-layout.component';
import { ListHeroesComponent } from './components/list-heroes/list-heroes.component';
import { AddHeroComponent } from './components/add-hero/add-hero.component';
import { EditHeroComponent } from './components/edit-hero/edit-hero.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'list-heroes', component: ListHeroesComponent },
      { path: 'add-hero', component: AddHeroComponent },
      { path: 'edit-hero/:id', component: EditHeroComponent },
      { path: '', redirectTo: 'list-heroes', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
