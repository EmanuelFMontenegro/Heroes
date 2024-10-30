// dashboard-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from '../layouts/dashboard-layout/dashboard-layout.component';
import { ListHeroesComponent } from './components/list-heroes/list-heroes.component';
import { DetailHeroComponent } from './components/detail-hero/detail-hero.component';
import { AddHeroComponent } from './components/add-hero/add-hero.component';
import { DeleteHeroComponent } from './components/delete-hero/delete-hero.component';
import { EditHeroComponent } from './components/edit-hero/edit-hero.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'list-heroes', component: ListHeroesComponent },
      { path: 'detail-hero', component: DetailHeroComponent },
      { path: 'add-hero', component: AddHeroComponent },
      { path: 'delete-hero', component: DeleteHeroComponent },
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
