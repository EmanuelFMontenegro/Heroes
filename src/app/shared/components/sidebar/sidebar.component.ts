// sidebar.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    MatIconModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  menuItems = [
    {
      path: '/dashboard/list-heroes',
      title: 'Listar Héroes',
      icon: 'assignment',
    },
    { path: '/dashboard/detail-hero', title: 'Detalle Héroe', icon: 'info' },
    { path: '/dashboard/add-hero', title: 'Agregar Héroe', icon: 'group_add' },
    { path: '/dashboard/delete-hero', title: 'Eliminar Héroe', icon: 'delete' },
  ];

  activeItem: string = '';

  setActive(item: string) {
    this.activeItem = item;
  }
}
